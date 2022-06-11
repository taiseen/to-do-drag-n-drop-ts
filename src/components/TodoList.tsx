import { Todo } from "../model"
import SingleTodo from "./SingleTodo";


interface Props {
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList: React.FC<Props> = ({ allTodo, setAllTodo }) => {

  return (
    <div className="allTodo">
      {
        allTodo.map(todo =>
          <SingleTodo
            key={todo.id}
            todo={todo}
            allTodo={allTodo}
            setAllTodo={setAllTodo}
          />
        )
      }
    </div>
  )
}

export default TodoList;