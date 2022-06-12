import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { InputField, TodoList } from './components'
import { useState } from 'react'
import { Todo } from './model';


const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  const [allTodo, setAllTodo] = useState<Todo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {

      // add user input todo into todo[array] for displaying UI
      setAllTodo(prev => (
        [...prev, { id: Date.now(), todo, isDone: false }]
      ));

      // clear user input...
      setTodo('');
    }
  }



  const onDragEnd = (result: DropResult) => {

    // console.log(result);

    const { destination, source } = result;

    let add,
      active = allTodo,
      complete = completedTodo;


    if (!destination) return; // if destination is null then just exit() from this function...

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) return;


    if (source.droppableId === 'todoList') {
      // get this single item... & store into add variable for temporary moment
      add = active[source.index]

      // remove this item, from "allTodo" array
      setAllTodo(pre => pre.splice(source.index, 1))
    } else {
      // get this single item... & store into add variable for temporary moment
      add = complete[source.index]

      // remove this item, from "completedTodo" array
      setCompletedTodo(pre => pre.splice(source.index, 1))
    }


    if (destination.droppableId === 'todoList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }


    setCompletedTodo(complete); // update completed array
    setAllTodo(active); // update allTodo array
  }



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app'>
        <h1 className='heading'>Task List</h1>

        {/* 🟨🟨🟨 User Input Field */}
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        {
          // 🟨🟨🟨 Print/Display all user input tasks
          allTodo.length > 0
            ? <TodoList
              allTodo={allTodo}
              setAllTodo={setAllTodo}
              completedTodo={completedTodo}
              setCompletedTodo={setCompletedTodo}
            />
            : <h1 className='info'>task list is empty</h1>
        }
      </div>
    </DragDropContext>
  )
}

export default App;