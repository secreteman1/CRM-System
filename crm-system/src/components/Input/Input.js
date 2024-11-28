import "./Input.sass";
import { useState } from "react";
export default function Input() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  function handleInputChange(event) {
    setValue(event.target.value);
  }

  const handleAddButtonClick = async () => {
    if (!value) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: value, isDone: false }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setValue("");
    }
  };

  return (
    <div className="input-button-group">
      <input
        value={value}
        onChange={handleInputChange}
        required
        placeholder="Task To Be Done..."
        className="input-header"
      ></input>
      <button
        onClick={handleAddButtonClick}
        disabled={loading}
        className="default-button"
      >
        Add
      </button>
    </div>
  );
}
