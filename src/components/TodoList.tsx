import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model"
import SingleTodo from "./SingleTodo";


interface Props {
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodo: Todo[];
  setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList: React.FC<Props> = ({ allTodo, setAllTodo, completedTodo, setCompletedTodo }) => {

  return (

    <div className="container">


      <Droppable droppableId='todoList'>
        {
          (provided, snapshot) => (
            <div
              className={`allTodo ${snapshot.isDraggingOver && 'dragActive'}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="todoHeading">Active Task</h2>
              {
                allTodo.map((todo, index) =>
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    setAllTodo={setAllTodo}
                  />
                )
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>



      <Droppable droppableId='todoRemove'>
        {
          (provided, snapshot) => (
            <div
              className={`allTodo remove ${snapshot.isDraggingOver && 'dragComplete'}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="todoHeading">Completed Task</h2>
              {
                completedTodo.map((todo, index) =>
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    setAllTodo={setCompletedTodo}
                  />
                )
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>


    </div>
  )
}

export default TodoList;