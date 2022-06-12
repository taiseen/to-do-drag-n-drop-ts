import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';


interface Props {
  index: number;
  todo: Todo;
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const SingleTodo: React.FC<Props> = ({ index, todo, setAllTodo }) => {


  const inputRef = useRef<HTMLInputElement>(null);
  const [editOption, setEditOption] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleEdit = (id: number) => {
    if (!editOption && !todo.isDone) {

      setEditOption(pre => !pre); // edit option open/close

    } else if (!todo.isDone) {

      setEditOption(pre => !pre); // edit option open/close

      setAllTodo(pre => (pre.map(todo => todo.id === id ? { ...todo, todo: editTodo } : todo))); // update todo
    }
  }


  // delete || remove todo from list || db
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure want to delete this task?')) {
      setAllTodo(pre => (
        pre.filter(todo => todo.id !== id)
      ));
    }
  }


  // update todo || conforming
  const handleDone = (id: number) => {
    setAllTodo(pre => (
      pre.map(todo => todo.id === id
        ? { ...todo, isDone: !todo.isDone }
        : todo
      )
    ));
  }


  const handleSubmitTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    // update todo
    setAllTodo(pre => (
      pre.map(todo => todo.id === id
        ? { ...todo, todo: editTodo }
        : todo
      )
    ));

    // close edit option
    setEditOption(pre => !pre);
  }


  useEffect(() => inputRef.current?.focus(), [editOption]);


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onSubmit={(e) => handleSubmitTodo(e, todo.id)}
            className={`singleTodo ${snapshot.isDragging && 'draggingTodo'}`}
          >

            {
              editOption
                ? <input
                  className='text'
                  ref={inputRef}
                  value={editTodo}
                  style={{ color: '#333' }}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
                : todo.isDone
                  ? <s className='text'>{todo.todo}</s>
                  : <span className='text'>{todo.todo}</span>
            }

            <div className='icons'>
              <AiFillEdit className='icon' onClick={() => handleEdit(todo.id)} />
              <MdDone className='icon' onClick={() => handleDone(todo.id)} />
              <AiFillDelete className='icon' onClick={() => handleDelete(todo.id)} />
            </div>

          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo