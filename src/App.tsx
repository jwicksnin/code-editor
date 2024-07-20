import * as esbuild from "esbuild-wasm";
import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const ref = useRef<any>();
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    // need to upgrade the version of esbuild wasm so it uses `initialize` instead?
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    return service;
  };

  useEffect(() => {
    async function startTransforming() {
      ref.current = await startService();
    }
    startTransforming();
    return () => {
      ref.current && ref.current.stop();
    };
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ref.current) {
      return;
    }
    // TODO use FormData here
    // and will we need to transpile import/exports?
    try {
      const transformed = await ref.current.transform(text, {
        loader: "jsx",
        target: "es2015",
      });
      setCode(transformed.code);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      <form>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {code && <pre>{code}</pre>}
    </>
  );
}

export default App;
