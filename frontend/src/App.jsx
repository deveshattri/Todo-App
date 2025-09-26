import { useEffect, useState } from 'react'
import CreateTodo from './components/CreateTodo'
import './App.css'
import { Todos } from './components/Todos';
function App() {
  const [todos, setTodos] = useState([]);
  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      const incompleteTodos = data.todos.filter((todo) => !todo.completed);
      setTodos(incompleteTodos);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);
  function addTodoToUI(newTodo) {
    setTodos((prev) => [...prev, newTodo]);
  }

  function removeTodoFromUI(id) {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  }

  return (
    <>
      <div>
        <CreateTodo onTodoAdded={addTodoToUI} />
        <Todos todos={todos} onTodoCompleted={removeTodoFromUI} />
      </div>
      
    </>
  )
}

export default App
