
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  changeTodoCategoryToComplete,
  changeTodoCategoryToTask,
} from "../redux/todo/todoSlice";
import { COMPLETED, TASKS,IMPORTANT } from "../redux/todo/categories";

interface Category {
  [IMPORTANT]: string[];
  [TASKS]: string[];
  [COMPLETED]: string[];
}

interface TodoState extends Category {
  selectedCategory: keyof Category;
}

interface RootState {
  todos: TodoState;
}

const Todo = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.todos.selectedCategory);
  const todos = useSelector((state: RootState) => state.todos[selectedCategory]);
  const todosCompleted = useSelector((state: RootState) => state.todos[COMPLETED]);
  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const taskName = (event.target as HTMLInputElement).value.trim();
      if (taskName === "") {
        return;
      }
      const taskObj = { category: selectedCategory as keyof Category, todo: taskName };
      dispatch(addTodo(taskObj));
      setAddTaskInputValue("");
    }
  };

  const handleTaskComplete = (todo:string) => {
    const params = {
      todo,
      category: COMPLETED as keyof Category, 
    };
    dispatch(changeTodoCategoryToComplete(params));
  };
  const handleTaskPending = (todo:string) => {
    const params = {
      todo,
      category: TASKS as keyof Category,
    };
    dispatch(changeTodoCategoryToTask(params));
  };

  return (
    <div className="rightside box">
      <div className="rightside-header">
        <div className="rightside-header-left">
          <div className="rightside-header-left-title">{selectedCategory}</div>
          <div className="rightside-header-left-day">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="rightside-header-right">
          <FontAwesomeIcon icon={faLightbulb} className="font-icon" />
        </div>
      </div>
      <div className="rightside-content">
        <div className="rightside-content-tasks">
          {todos?.map(singleTodo => (
            <div className="task-item" key={singleTodo}>
              <input
                type="radio"
                name="todoSelect"
                value={singleTodo}
                onChange={e => handleTaskComplete(e.target.value)}
              />
              {singleTodo}
            </div>
          ))}
        </div>
        {todosCompleted?.length > 0 && (
          <>
            {" "}
            <div className="completed-header-title">
              <span>Completed</span>
            </div>
            <div className="rightside-content-completed">
              {todosCompleted?.map(singleTodo => (
                <div className="task-item todo-completed" key={singleTodo}>
                  <input
                    type="radio"
                    name="todoSelect"
                    value={singleTodo}
                    onChange={e => handleTaskPending(e.target.value)}
                  />
                  {singleTodo}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="rightside-footer">
        <FontAwesomeIcon icon={faPlus} className="add-task-icon font-icon" />
        <input
          type="text"
          placeholder="Add a task"
          onKeyDown={handleKeyPress}
          value={addTaskInputValue}
          onChange={e => setAddTaskInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Todo;
