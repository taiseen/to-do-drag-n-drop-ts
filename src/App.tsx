import InputField from './components/InputField'
import TodoList from './components/TodoList';
import { useState } from 'react'
import { Todo } from './model';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  const [allTodo, setAllTodo] = useState<Todo[]>([]);


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setAllTodo(prev => ([...prev, { id: Date.now(), todo, isDone: false }]));
      setTodo('');
    }
  }

  console.log(allTodo);

  return (
    <div className='app'>
      <h1 className='heading'>Task List</h1>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      {
        allTodo.length > 0
          ? <TodoList allTodo={allTodo} setAllTodo={setAllTodo} />
          : <h1 className='info'>task list is empty</h1>
      }
    </div>
  )
}

export default App