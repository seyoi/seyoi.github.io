import { useRef, ChangeEvent, useState, useEffect } from 'react';
import './create-meet.css';

function BasicWYSIWYGEditor({ onContentChange }: { onContentChange: (content: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  // const [image, setImage] = useState<File | null>(null);
  
  useEffect(() => {
    const handleChange = () => {
      if (editorRef.current) {
        onContentChange(editorRef.current.innerHTML);
      }
    };

    if (editorRef.current) {
      editorRef.current.addEventListener('input', handleChange);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener('input', handleChange);
      }
    };
  }, [onContentChange]);

  const handleBold = () => {
    document.execCommand('bold');
    if (editorRef.current) onContentChange(editorRef.current.innerHTML);
  };

  const handleUnderline = () => {
    document.execCommand('underline');
    if (editorRef.current) onContentChange(editorRef.current.innerHTML);
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    setFontSize(selectedSize);
    document.execCommand('fontSize', false, selectedSize);
    if (editorRef.current) onContentChange(editorRef.current.innerHTML);
  };

  const handleFontColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    document.execCommand('foreColor', false, selectedColor);
    if (editorRef.current) onContentChange(editorRef.current.innerHTML);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result && editorRef.current) {
        const img = document.createElement('img');
        img.src = event.target.result.toString();
        editorRef.current.appendChild(img);
        onContentChange(editorRef.current.innerHTML);
      }
    };
    reader.readAsDataURL(file);
  };

  const fontSizeOptions = Array.from({ length: 43 }, (_, index) => index + 8);

  return (
    <div className="editor">
      <br />
      <br />{' '}
      <div className="mb-4">
        <h3 className="text-xl font-bold">상세 소개글</h3>
      </div>{' '}
      <div className="border bg-gray-100 p-4 rounded">
        <div className="inline">
          {' '}
          <button onClick={handleBold}>강조 </button>
        </div>
        <div className="inline">
          {' '}
          <button onClick={handleUnderline}>밑줄 </button>
        </div>
        <div className="inline text-red">
          <label>
            <select value={fontSize} onChange={handleFontSizeChange}>
              <option value="">글자크기</option>
              {fontSizeOptions.map((size) => (
                <option key={size} value={size.toString()}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="inline">
          <label className="inline">
            글자색:
            <input
              className="inline"
              type="color"
              value={color}
              onChange={handleFontColorChange}
              style={{ verticalAlign: 'middle', marginLeft: '5px' }}
            />
          </label>
        </div>
        {/* <BtnMedium
        bgColor="bg-blue-500"
        onClick={() => document.getElementById('image-upload')?.click()}
        text="이미지 업로드"
      /> */}{' '}
        <br />
        <div className="inline">
          <label htmlFor="img">이미지 삽입: </label>
          <input
            name="img"
            id="image-upload"
            className="inline-block ml-2"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div
        contentEditable
        ref={editorRef}
        style={{
          border: '1px solid lightGray',
          minHeight: '200px',
          padding: '10px',
        }}
      />{' '}
    </div>
  );
}

export default BasicWYSIWYGEditor;
