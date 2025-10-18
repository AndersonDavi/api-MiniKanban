const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise")

const app = express();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tareas"
})
app.use(cors()); 
app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM lista_tarea");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        
        const { title, status, description } = req.body;
        if (title.length <3){
            return res.status(400).json({ error: "El titulo debe tener al menos 3 caracteres" });
        }
        const [result] = await pool.query("INSERT INTO lista_tarea (title, status, description, createdAt ) VALUES (?, ?, ?, ?)", [title,status, description, new Date()]);
        res.json({message: "Tarea agregada exitosamente", id: result.insertId, title, status, createAD: new Date() });
    } catch (error) {
        console.error("Error al agregar una tarea:", error);
        res.status(500).json({ error: "Error al agregar una tarea" });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM lista_tarea WHERE id = ?", [id]);
        res.json({message: "Tarea eliminada exitosamente", id});
    } catch (error) {
        console.error("Error al eliminar una tarea:", error);
        res.status(500).json({ error: "Error al eliminar una tarea" });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const { title, status, description} = req.body;
        if (title.length <3){
            return res.status(400).json({ error: "El titulo debe tener al menos 3 caracteres" });
        }
        const [result] = await pool.query("UPDATE lista_tarea SET title = ?, status = ? ,description = ? WHERE id = ?", [title, status, description, id]);
        res.json({message: "Tarea actualizada exitosamente", id, title, status, description});
    } catch (error) {
        console.error("Error al actualizar una tarea:", error);
        res.status(500).json({ error: "Error al actualizar una tarea" });
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

