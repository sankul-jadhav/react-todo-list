import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)

    //handleDelete logic
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    let newTodos =[...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    console.log(todos)
    saveToLS(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

   const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`)

    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold my-2'>Add a todo</h2>
          <div className='flex '>
            <input onChange={handleChange} value={todo} type="text" className=' w-full border  border-black rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className=' mx-2 bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full  disabled:bg-violet-600'>Save</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} name=""  /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='bg-black h-[1px] opacity-20 my-2 w-[95%] mx-auto'></div>
        <h2 className='text-xl font-bold'>Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-3'>No Todos to display</div>}
          {todos.map(item => {

            //This condition controls the visibility of completed todos. If showFinished is true, all todos are displayed. If it is false, only incomplete todos are displayed.
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-3/4 justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
