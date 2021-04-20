import { useState } from "react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [complete, setComplete] = useState(false);


  function onSubmit(e) {
    e.preventDefault();
    const task = {
      id: new Date(),
      name: e.target.task.value,
      status: false,
    };
    setList([...list, task]);
    e.target.task.value = "";
  }

  function done(item) {
    const newList = list.map((t) => {
      if (t.id === item.id) t.status = !t.status;
      return t;
    });
    setList(newList);
  }
  function showAllDone() {
    setComplete(true);
  }
  function showAllTask() {
    setComplete(false);
  }


  function alterTask(event, item) {
    const newList = list.map((t) => {
      if (t.id === item.id) t.name = event.target.value;
      return t;
    });
    setList(newList);
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input name="task" />
        <button type="submit">Adicionar</button>
      </form>
      {complete ? <button onClick={showAllTask}>Mostrar todas</button> : <button onClick={showAllDone}>Não Concluidas</button>}
      <ul>
        {!complete && list.map((item, index) => {
          return (
            <li style={item.status ? { textDecoration: "line-through" } : {}} key={index}  >
              <input type="text" defaultValue={item.name} onChange={(e) => alterTask(e, item)} />
              <button onClick={() => done(item)}>
                {item.status ?
                  <FaRegCheckSquare /> :
                  <FaRegSquare />}
              </button>
            </li>
          );
        })}

        {complete && list.map((item, index) => {
          return (
            !item.status ? <><li key={index}>  <input type="text" value={item.name} onChange={alterTask} /> <button onClick={() => done(item)}>
              {item.status ?
                <FaRegCheckSquare /> :
                <FaRegSquare />}
            </button></li> </> : ""
          )
        })}
      </ul>
    </div >
  );
}

export default App;
