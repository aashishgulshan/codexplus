import { useState } from "react";
import { Editor } from "@monaco-editor/react";
const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div className="overflow-hidden w-full h-full shadow-lg">
      <Editor
        height={`85vh`}
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// Start Your code with codeXplus. . ."
      />
    </div>
  );
};
export default CodeEditor;
