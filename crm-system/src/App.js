import Input from "./components/Input/Input.js";
import Button from "./components/Button/Button.js";
import Data from "./components/Data/Data.js";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [something, setSomething] = useState("all");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityInformation, setQuantityInformation] = useState("0");
  function handleClick(name) {
    setSomething(name);
  }

  useEffect(
    (something) => {
      const fetchTodos = async () => {
        try {
          const response = await fetch(
            `https://easydev.club/api/v1/todos?filter=${something}`
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

      fetchTodos();
    },
    [something]
  );

  return (
    <div>
      <main>
        <Input></Input>
        <div className="button-group">
          <Button
            className={
              something === "all" ? "no-background-picked" : "no-background"
            }
            title={`Все (${quantityInformation.all})`}
            onClick={() => handleClick("all")}
          />
          <Button
            className={
              something === "inWork" ? "no-background-picked" : "no-background"
            }
            title={`В работе (${quantityInformation.inWork})`}
            onClick={() => handleClick("inWork")}
          />
          <Button
            className={
              something === "completed"
                ? "no-background-picked"
                : "no-background"
            }
            title={`Сделано (${quantityInformation.completed})`}
            onClick={() => handleClick("completed")}
          />
        </div>
        <Data information={todos} title={something}></Data>
      </main>
    </div>
  );
}

export default App;
