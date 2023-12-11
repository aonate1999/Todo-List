// TodoItem.js
import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  // Verifica si la tarea está vencida comparando la fecha de vencimiento con la fecha actual
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: isOverdue ? 'red' : 'inherit', // Cambia el color si la tarea está vencida
        }}
      >
        {todo.task}
      </span>
      <div>
        {todo.dueDate && (
          <p>
            <strong>Fecha de Vencimiento:</strong> {todo.dueDate}
            {isOverdue && <span> (¡Vencida!)</span>}
          </p>
        )}
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
    </li>
  );
};

export default TodoItem;
