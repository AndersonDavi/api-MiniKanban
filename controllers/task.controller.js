const Task = require("../models/Task");

class TaskController {
  static async getAll(req, res) {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  }

  static async create(req, res) {
    try {
      const { title, status, description } = req.body;
      const task = await Task.create({ title, status, description });
      res.json({ message: "Tarea agregada exitosamente", task });
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, status, description } = req.body;
      const task = await Task.findByPk(id);

      if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

      await task.update({ title, status, description });
      res.json({ message: "Tarea actualizada exitosamente", task });
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      res.status(500).json({ error: "Error al actualizar tarea" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Task.destroy({ where: { id } });

      if (!deleted)
        return res.status(404).json({ error: "Tarea no encontrada" });

      res.json({ message: "Tarea eliminada exitosamente", id });
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      res.status(500).json({ error: "Error al eliminar tarea" });
    }
  }
}

module.exports = TaskController;
