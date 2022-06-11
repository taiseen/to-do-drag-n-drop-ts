import { useRef } from "react";

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className="inputForm" onSubmit={e => {
            handleAdd(e);
            inputRef.current?.blur();
        }}>

            <input
                type="text"
                value={todo}
                ref={inputRef}
                className="inputBox"
                placeholder="Enter a task"
                onChange={e => setTodo(e.target.value)}
            />

            <button className="submit" type="submit">Go</button>

        </form>
    )
}

export default InputField