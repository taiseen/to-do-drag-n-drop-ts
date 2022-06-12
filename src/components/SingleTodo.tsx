import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';


interface Props {
  index: number;
  todo: Todo;
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  // setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const SingleTodo: React.FC<Props> = ({ index, todo, setAllTodo }) => {


  const inputRef = useRef<HTMLInputElement>(null);
  const [editOption, setEditOption] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleEdit = (id: number) => {
    if (!editOption && !todo.isDone) {
      // just open edit option
      setEditOption(pre => !pre);
    } else {
      setEditOption(pre => !pre);
      // update todo
      setAllTodo(pre => (
        pre.map(todo => todo.id === id
          ? { ...todo, todo: editTodo }
          : todo
        )
      ));
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
        (provided) => (
          <form className='singleTodo' onSubmit={(e) => handleSubmitTodo(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
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
              <AiFillDelete className='icon' onClick={() => handleDelete(todo.id)} />
              <MdDone className='icon' onClick={() => handleDone(todo.id)} />
            </div>

          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo