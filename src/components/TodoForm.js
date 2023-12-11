// TodoForm.js
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dueDate);
      addTodo(task, isValidDate ? dueDate : null);
      setTask('');
      setDueDate('');
    }
  };

  return (
    <div className={`todo-form${darkMode ? ' dark-mode' : ''}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Agregar nueva tarea"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="date-container">
          <label htmlFor="dueDate">Fecha de Vencimiento:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="dark-mode-button"
      >
        Modo {darkMode ? 'Claro' : 'Oscuro'}
      </button>
    </div>
  );
};

export default TodoForm;
