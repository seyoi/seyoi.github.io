import { useState } from 'react';

function Challenge({ onChange }: any) {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleOptionChange = (newValue: boolean) => {
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <br /> <br />
      <div className="mb-4">
        <h3 className="text-xl font-bold">챌린지</h3>
      </div>{' '}
      <div className="flex">
        <input
          className="mr-1"
          type="radio"
          id="yes"
          name="challenge"
          value="yes"
          checked={selectedOption}
          onChange={() => handleOptionChange(true)}
        />
        <label htmlFor="yes">있어요</label>

        <input
          className="ml-4 mr-1"
          type="radio"
          id="no"
          name="challenge"
          value="no"
          checked={!selectedOption}
          onChange={() => handleOptionChange(false)}
        />
        <label htmlFor="no">없어요</label>
      </div>
    </div>
  );
}

export default Challenge;
