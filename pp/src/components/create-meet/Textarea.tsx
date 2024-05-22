import { useState } from 'react';

interface TextareaProps {
  title: string;
  onTextChange: (text: string) => void;
}

function Textarea({ title, onTextChange }: TextareaProps) {
  const [textData, setTextData] = useState<string>('');
  const handleTextData = (value: string) => {
    setTextData(value);
    console.log(value);
    onTextChange(value);
  };
  return (
    <div>
      <h3>{title}</h3>
      <textarea
        className="border border-solid border-ppVeryLightGray rounded overflow-hidden"
        name=""
        id=""
        onChange={(e) => handleTextData(e.target.value)}
        value={textData}
      ></textarea>
    </div>
  );
}

export default Textarea;
