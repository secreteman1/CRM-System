import "./Data.sass";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
export default function Main({ information, title }) {
  let completedTasks;

  if (title === "inWork") {
    completedTasks = information.filter((task) => !task.isDone);
  } else if (title === "completed") {
    completedTasks = information.filter((task) => task.isDone);
  } else {
    completedTasks = information;
  }

  return (
    <div>
      <ul>
        {completedTasks.map((todo) => (
          <div className="styled-div" key={todo.id}>
            <div className="checkbox-input">
              <input type="checkbox"></input>
              {todo.title}
            </div>
            <div className="buttons-div">
              <button className="edit-button">
                <img src={editIcon}></img>
              </button>
              <button className="delete-button">
                <img src={deleteIcon}></img>
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
