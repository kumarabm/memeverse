// import dynamic from "next/dynamic";
// import { useEffect, useRef } from "react";
// import "quill/dist/quill.snow.css"; // Import Quill styles

// const QuillNoSSR = dynamic(() => import("quill"), { ssr: false }); // ✅ Prevents SSR issues

// const TextEditor = ({ content, setContent }) => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") { // ✅ Ensures it's running on client-side
//       const Quill = require("quill"); // ✅ Import Quill dynamically in the browser

//       const quill = new Quill(editorRef.current, {
//         theme: "snow",
//         placeholder: "Write something funny...",
//       });

//       quill.on("text-change", () => {
//         setContent(quill.root.innerHTML);
//       });
//     }
//   }, []);

//   return <div ref={editorRef} className="border rounded-md p-2 bg-white" />;
// };

// export default TextEditor;


import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TextEditor() {
  const [value, setValue] = useState("");

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}
