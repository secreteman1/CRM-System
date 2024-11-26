import Input from "./components/Input/Input";
import "./App";
import Button from "./components/Button/Button";

function App() {
  return (
    <div>
      <main>
        <Input></Input>
        <div className="button-group">
          <Button title="Все" value="5" />
          <Button title="В работе" value="3" />
          <Button title="Сделано" value="2" />
        </div>
      </main>
    </div>
  );
}

export default App;
