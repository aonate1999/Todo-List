import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task, dueDate) => {
    // Verificar si la fecha es anterior a la fecha actual
    const currentDate = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate < currentDate) {
      alert('¡No puedes agregar tareas para fechas anteriores!');
      return; // No agregar la tarea si la fecha es anterior
    }

    setTodos([...todos, { id: Date.now(), task, completed: false, dueDate }]);
    
    // Mostrar el mensaje de tarea creada durante 2 segundos
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const pendingTasks = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      <div className="header">
        <h1>Lista de Tareas</h1>
        <button className="dark-mode-button" onClick={toggleDarkMode}>
          Modo {darkMode ? 'Claro' : 'Oscuro'}
        </button>
      </div>
      {showMessage && <div className="message">¡Tarea creada con éxito!</div>}
      <TodoForm addTodo={addTodo} />
      <div>
        Tareas Pendientes: {pendingTasks}
      </div>
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <div>
        Filtro:{' '}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
    </div>
  );
};

export default App;
