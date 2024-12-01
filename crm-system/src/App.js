import Input from "./components/Input/Input.js";
import Button from "./components/Button/Button.js";
import Data from "./components/Data/Data.js";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [title, setSomething] = useState("all");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityInformation, setQuantityInformation] = useState("0");
  const [isValid, setIsValid] = useState(true);
  function handleClick(name) {
    setSomething(name);
  }

  function handleValidation(value) {
    setIsValid(value);
  }

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `https://easydev.club/api/v1/todos?filter=${title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data.data);
      setQuantityInformation(data.info);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(title);
  }, [title]);

  return (
    <div>
      <main>
        <Input refresh={fetchTodos} validation={handleValidation}></Input>
        {!isValid && (
          <p className="error-p">Количество символов минимум 2 максимум 64</p>
        )}
        <div className="button-group">
          <Button
            className={
              title === "all" ? "no-background-picked" : "no-background"
            }
            title={`Все (${quantityInformation.all})`}
            onClick={() => handleClick("all")}
          />
          <Button
            className={
              title === "inWork" ? "no-background-picked" : "no-background"
            }
            title={`В работе (${quantityInformation.inWork})`}
            onClick={() => handleClick("inWork")}
          />
          <Button
            className={
              title === "completed" ? "no-background-picked" : "no-background"
            }
            title={`Сделано (${quantityInformation.completed})`}
            onClick={() => handleClick("completed")}
          />
        </div>
        <Data
          information={todos}
          title={title}
          refresh={fetchTodos}
          validation={handleValidation}
        ></Data>
      </main>
    </div>
  );
}

export default App;
