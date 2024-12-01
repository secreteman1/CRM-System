import "./Data.sass";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import { useState } from "react";

export default function Main({ information, title, refresh, validation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isEditingNow, setEditingNow] = useState(false);
  let completedTasks;

  if (title === "inWork") {
    completedTasks = information.filter((task) => !task.isDone);
  } else if (title === "completed") {
    completedTasks = information.filter((task) => task.isDone);
  } else {
    completedTasks = information;
  }

  const onDeleteClick = async (value) => {
    if (isEditingNow) {
      setEditId(null);
      setEditingNow(false);
    } else {
      setLoading(true);
      validation(true);
      try {
        const response = await fetch(
          `https://easydev.club/api/v1//todos/${value}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        refresh();
      }
    }
  };

  const onChangeCheckbox = async (value, currentStatus) => {
    setLoading(true);
    try {
      const newStatus = !currentStatus;
      const response = await fetch(
        `https://easydev.club/api/v1//todos/${value}`,
        { method: "PUT", body: JSON.stringify({ isDone: newStatus }) }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      refresh();
    }
  };

  function onChangeValue(event) {
    setInputValue(event.target.value);
  }

  const handeEditClick = async (value) => {
    if (!isEditingNow) {
      setEditId(value);
      setInputValue("");
      setEditingNow(true);
    } else {
      if (inputValue.length > 64 || inputValue.length < 2) {
        setInputValue("");
        validation(false);
      } else {
        setLoading(true);
        validation(true);
        try {
          const response = await fetch(
            `https://easydev.club/api/v1//todos/${value}`,
            { method: "PUT", body: JSON.stringify({ title: inputValue }) }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
          setEditingNow(false);
          setEditId(null);
          refresh();
        }
      }
    }
  };

  return (
    <div>
      <ul className="no-padding">
        {completedTasks.map((todo) => (
          <div className="styled-div" key={todo.id}>
            <div className="checkbox-input">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => onChangeCheckbox(todo.id, todo.isDone)}
              ></input>
              {editId === todo.id ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={onChangeValue}
                  className="chanching-input"
                ></input>
              ) : (
                <p className={todo.isDone ? "done-p" : null}>{todo.title}</p>
              )}
            </div>
            <div className="buttons-div">
              <button
                className="edit-button"
                onClick={() => handeEditClick(todo.id)}
              >
                {editId === todo.id ? (
                  <p className="changed-button">Save</p>
                ) : (
                  <img src={editIcon} alt="edit-picture"></img>
                )}
              </button>
              <button
                className="delete-button"
                onClick={() => onDeleteClick(todo.id)}
                disabled={loading}
              >
                {editId === todo.id ? (
                  <p className="changed-button">Cancel</p>
                ) : (
                  <img src={deleteIcon} alt="delete-picture"></img>
                )}
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
