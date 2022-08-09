import React from 'react'
import './App.css'
import Todo from './Components/Todo';

function App() {

  const today = new Date(Date.now());

  const [sortby, setSortby] = React.useState({by: "deadline", order: "asc"});
  const [todo, setTodo] = React.useState([]);
  const [currentTodo, setCurrentTodo] = React.useState({done: false, title: "", description: "", deadline: today.toISOString().substring(0, 10)});

  React.useEffect(() => {
    if(localStorage.getItem("todo")){
      setTodo(JSON.parse(localStorage.getItem("todo")));
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo])

  function handleClick() {
    
    if(!currentTodo.title){
      alert("No title provided");
      return ;
    }
    setTodo(prev => {
      return [...prev, currentTodo];
    })
    
    setCurrentTodo({done: false, title: "", description: "", deadline: today.toISOString().substring(0, 10)} )
  }

  function handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setCurrentTodo(prev => ({...prev, [name]: value}));
  }

  const todoElements = React.useMemo(() => {
    
    const todoCopy = todo;
    
    if(sortby.by == "title"){
        todoCopy.sort((a, b) => {if(a.title > b.title) return 1
         if(a.title == b.title) return 0;0
          if(a.title < b.title) return -1;
        })
    }else if(sortby.by == "deadline"){
      todoCopy.sort((a, b) => {if(a.deadline > b.deadline) return 1
        if(a.deadline == b.deadline) return 0;
         if(a.deadline < b.deadline) return -1;
       })
    }if(sortby.order == "desc"){
      todoCopy.reverse();
    }

    return todoCopy.map(todo => {console.log("remap"); return<Todo todo = {todo}/> })
  }, [todo, sortby])

  function handleSortChange(e) {
    const name = e.target.name;
    const value = e.target.value
    setSortby(prev => ({...prev, [name]: value}))
  }

  console.log(todoElements)

  return (
    <div className="App">
        <h1>
          To-Do App
        </h1>
        <form action="">
          <label htmlFor="title">title</label>
          <input id="title" type="text" value={currentTodo.title} name='title' required={true} onChange={(e) => handleChange(e)}/>
          <label htmlFor="description">description</label>
          <input type="text" value={currentTodo.description} name='description' id='description' onChange={(e) => handleChange(e)}/>
          <label htmlFor="deadline">deadline</label>
          <input type="date" id="deadline" name="deadline"
       value={currentTodo.deadline}
       min={today.toISOString().substring(0, 10)} 
       onChange={(e) => handleChange(e)}/>
          <button type='button' onClick={handleClick}>ADD TO-DO ITEM</button>
        </form>
        <br /><br />
        <hr />
        <br /><br />
        <div className="sortby">
          <label htmlFor='orderby'>Order by: </label>
          <select name="by" id="orderby" onChange={(e) => handleSortChange(e)} value={sortby.by}>
            <option value="title">Name</option>
            <option value="deadline">Due Date</option>
          </select>
          <select name="order" id="order" onChange={(e) => handleSortChange(e)} value={sortby.order}>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </div>
        {todoElements}
    </div>
  )
}

export default App
