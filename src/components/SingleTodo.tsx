import React, { useEffect, useRef, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';


interface Props {
  todo: Todo;
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const SingleTodo: React.FC<Props> = ({ todo, allTodo, setAllTodo }) => {


  const inputRef = useRef<HTMLInputElement>(null);
  const [editOption, setEditOption] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleEdit = () => {
    if (!editOption && !todo.isDone) {
      // just open edit option
      setEditOption(pre => !pre);
    }
  }


  // delete || remove todo from list || db
  const handleDelete = (id: number) => {
    setAllTodo(pre => (
      pre.filter(todo => todo.id !== id)
    ));
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
    <form className='singleTodo' onSubmit={(e) => handleSubmitTodo(e, todo.id)}>

      {
        editOption
          ? <input
            className='text'
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
          : todo.isDone
            ? <s className='text'>{todo.todo}</s>
            : <span className='text'>{todo.todo}</span>
      }

      <div className='icons'>
        <AiFillEdit className='icon' onClick={handleEdit} />
        <AiFillDelete className='icon' onClick={() => handleDelete(todo.id)} />
        <MdDone className='icon' onClick={() => handleDone(todo.id)} />
      </div>

    </form>
  )
}

export default SingleTodo