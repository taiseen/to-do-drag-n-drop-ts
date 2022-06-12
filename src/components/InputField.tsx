import { useEffect, useRef } from "react";

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const taskSubmit = (e: React.FormEvent) => {
        handleAdd(e);
        inputRef.current?.blur();
        inputRef.current?.focus();
    }

    return (
        <form className="inputForm" onSubmit={taskSubmit}>

            <input
                type="text"
                value={todo}
                ref={inputRef}
                className="inputBox"
                placeholder="Enter your task context..."
                onChange={e => setTodo(e.target.value)}
            />

            <button className="submit" type="submit">Enter</button>

        </form>
    )
}

export default InputField