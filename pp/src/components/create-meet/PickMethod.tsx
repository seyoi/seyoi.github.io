import { useState } from 'react';
import './create-meet.css';
interface PickMethodProps {
  onQuestionChange: (questions: string[]) => void;
}

function PickMethod({ onQuestionChange }: PickMethodProps) {
  const [method, setMethod] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
    onQuestionChange(newQuestions);
  };

  return (
    <div>
      {' '}
      <br /> <br />
      <div className="mb-4">
        <h3 className="text-xl font-bold">멤버 선발 방식</h3>
      </div>{' '}
      <div className="flex">
        <input
          className="mr-1"
          type="radio"
          name="method"
          id="first-come"
          value="first-come"
          onChange={handleMethodChange}
        />
        <label className="mr-4" htmlFor="first-come">
          선착순
        </label>
        <input
          className="mr-1"
          type="radio"
          name="method"
          id="motivation"
          value="motivation"
          onChange={handleMethodChange}
        />
        <label htmlFor="motivation">지원동기</label>
      </div>
      <div className="p-5 mt-5  bg-gray-100 rounded">
        {method === 'motivation' && (
          <div>
            {questions.map((question, index) => (
              <div key={index}>
                {' '}
                {index + 1}. <br />
                <input
                  className=" mt-1 mb-2 inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
                  type="text"
                  value={question}
                  onChange={(event) => handleQuestionChange(index, event)}
                />
              </div>
            ))}
            <br />
            <button
              className="mt-1 p-1 w-10 text-white bg-blue-600 inline-block overflow-hidden rounded"
              onClick={handleAddQuestion}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PickMethod;
