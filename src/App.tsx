import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCode(text);
  };
  return (
    <>
      <form>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {code && <pre>{code}</pre>}
    </>
  );
}

export default App;
