import * as esbuild from "esbuild-wasm";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

function App() {
  const ref = useRef<any>();
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    // need to upgrade the version of esbuild wasm so it uses `initialize` instead?
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  }

  useEffect(() => {
    // async function startTransforming() {
    //   await startService();
    // }
    // if (!ref.current) {
      startService();
    // }
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ref.current) {
      return;
    }
    // TODO use FormData here
    // and will we need to transpile import/exports?
    const env = ["process", "env", "NODE_ENV"].join('.');
    try {
      const transformed = await esbuild.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(text)],
        define: {
          [env]: '"production"',
          globalName: "window"
        }
      });
      setCode(transformed.outputFiles[0].text);
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
