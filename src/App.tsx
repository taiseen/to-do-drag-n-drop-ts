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
    console.log(result);

    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;


    let add, active = allTodo, complete = completedTodo;


    if (source.droppableId === 'todoList') {
      add = active[source.index]
      active.splice(source.index, 1);
    } else {
      add = active[source.index]
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'todoList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodo(complete);
    setAllTodo(active);
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