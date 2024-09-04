/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../Contexts";
import {
  Card,
  Typography,
  Checkbox,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Reveal from "./Reveal";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [description, setDescription] = useState(todo.description);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg, description });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    console.log(`Toggling complete status for todo with id: ${todo.id}`);
    toggleComplete(todo.id);
  };

  return (
    <Card
      className={`flex w-full p-6 justify-between items-center rounded-lg shadow-lg transition duration-300 
        ${todo.completed ? "bg-green-400 line-through" : "bg-neutral-900/40"}`}
    >
      <Reveal>
        <div className="flex items-start gap-4">
          <Checkbox
            color="green"
            checked={todo.completed}
            onChange={toggleCompleted}
            aria-checked={todo.completed}
          />
          <div className="flex flex-col">
            {isTodoEditable ? (
              <Input
                color="orange"
                size="lg"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                className="text-lg font-bold text-neutral-200 bg-transparent"
              />
            ) : (
              <Typography
                variant="h6"
                className="text-neutral-900 bg-orange-400 w-full px-3 py-1 rounded-sm font-bold"
              >
                {todoMsg}
              </Typography>
            )}

            {isTodoEditable ? (
              <Textarea
                size="md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 text-sm bg-transparent"
              />
            ) : (
              <Typography variant="small" className="text-zinc-100 mt-2">
                {description}
              </Typography>
            )}

            {/* Displaying the creation date */}
            <Typography
              variant="caption"
              className="text-neutral-300 bg-orange-700 p-1 rounded-md font-bold w-fit mt-1"
            >
              {todo.createdAt}
            </Typography>
          </div>
        </div>
        <div className="flex justify-center border-b-2 border-orange-500 rounded-lg w-fit mx-auto p-1 items-center gap-2">
          <Button
            color={isTodoEditable ? "yellow" : "green"}
            size="md"
            className="flex items-center justify-center"
            onClick={() => {
              if (todo.completed) return;
              if (isTodoEditable) {
                editTodo();
              } else {
                setIsTodoEditable((prev) => !prev);
              }
            }}
            disabled={todo.completed}
            aria-label={isTodoEditable ? "Save Todo" : "Edit Todo"}
          >
            {isTodoEditable ? (
              <FaSave className="text-xl text-yellow-500 bg-black" />
            ) : (
              <FaEdit className="text-xl text-green-500 " />
            )}
          </Button>
          <Button
            color="red"
            size="md"
            className="flex items-center justify-center"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete Todo"
          >
            <FaDeleteLeft className="text-xl text-red-500" />
          </Button>
        </div>
      </Reveal>
    </Card>
  );
}

export default TodoItem;
