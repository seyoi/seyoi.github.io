import { useState } from 'react';
import Chip from './Chip';
import Textarea from './Textarea';

interface MemberDataProps {
  onDataChange: (data: MemberDataFormData) => void;
}

export interface MemberDataFormData {
  selectedOption: string | null;
  selectedChips: string[];
  selectedNumberOption: string | null;
  selectedNumber: number | null;
  memberTextData: string | null;
}

function MemberData({ onDataChange }: MemberDataProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedNumberOption, setSelectedNumberOption] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [memberTextData, setMemberTextData] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setSelectedChips([]);
    setSelectedNumber(null);
    onDataChange({
      selectedOption: option,
      selectedChips: [],
      selectedNumber: null,
      memberTextData,
      selectedNumberOption,
    });
  };

  const handleNumberOptionChange = (option: string) => {
    setSelectedNumberOption(option);
    onDataChange({
      selectedOption,
      selectedChips,
      selectedNumber: null,
      memberTextData,
      selectedNumberOption,
    });
  };

  const handleNumberInputChange = (value: number) => {
    setSelectedNumber(value);
    onDataChange({
      selectedOption,
      selectedChips,
      selectedNumber: value,
      memberTextData,
      selectedNumberOption,
    });
  };

  const handleChipSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedChips((prevSelectedChips) => [...prevSelectedChips, id]);
    } else {
      setSelectedChips((prevSelectedChips) => prevSelectedChips.filter((chipId) => chipId !== id));
    }
    onDataChange({
      selectedOption,
      selectedChips,
      selectedNumber,
      memberTextData,
      selectedNumberOption,
    });
  };

  const handleTextDataChange = (text: string) => {
    setMemberTextData(text);
    onDataChange({
      selectedOption,
      selectedChips,
      selectedNumber,
      memberTextData: text,
      selectedNumberOption,
    });
  };

  return (
    <div>
      <div className="">
        {' '}
        <br /> <br />
        <div className="mb-4">
          <h3 className="text-xl font-bold">멤버 정보</h3>
        </div>
        <div className="text-sm">연령</div>{' '}
        <div className="flex mt-3">
          <div className="flex">
            <input
              className="mr-1"
              type="radio"
              id="unlimited"
              name="age"
              value="unlimited"
              checked={selectedOption === 'unlimited'}
              onChange={() => handleOptionChange('unlimited')}
            />
            <label className="mr-4" htmlFor="unlimited">
              제한없음
            </label>
          </div>
          <div className="flex">
            <input
              className="mr-1"
              type="radio"
              id="age"
              name="age"
              value="age"
              checked={selectedOption === 'age'}
              onChange={() => handleOptionChange('age')}
            />
            <label className="mr-4" htmlFor="age">
              나이 설정
            </label>
          </div>{' '}
        </div>
      </div>
      <div className="mt-4 mb-7">
        {selectedOption === 'age' && (
          <div className="flex">
            <Chip name={'10대'} id={'10s'} onSelect={handleChipSelect} />
            <Chip name={'20대'} id={'20s'} onSelect={handleChipSelect} />
            <Chip name={'30대'} id={'30s'} onSelect={handleChipSelect} />
            <Chip name={'40대'} id={'40s'} onSelect={handleChipSelect} />
            <Chip name={'50대'} id={'50s'} onSelect={handleChipSelect} />
            <Chip name={'60대'} id={'60s'} onSelect={handleChipSelect} />
            <Chip name={'70대'} id={'70s'} onSelect={handleChipSelect} />
            <Chip name={'80대'} id={'80s'} onSelect={handleChipSelect} />
          </div>
        )}
      </div>
      {/* <div>
        <p>선택된 칩:</p>
        <ul>
          {selectedChips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div> */}{' '}
      <br /> <p className="text-sm">인원</p>
      <div className="flex mt-3">
        {' '}
        <div className="flex">
          {' '}
          <input
            className="mr-1"
            type="radio"
            id="unlimited"
            name="memberNumberOption"
            value="unlimited"
            checked={selectedNumberOption === 'unlimited'}
            onChange={() => handleNumberOptionChange('unlimited')}
          />
          <label className="mr-4" htmlFor="unlimited">
            제한없음
          </label>
          <input
            className="mr-1"
            type="radio"
            id="number"
            name="memberNumberOption"
            value="number"
            checked={selectedNumberOption === 'number'}
            onChange={() => handleNumberOptionChange('number')}
          />
          <label htmlFor="number">인원 설정</label>{' '}
        </div>
      </div>
      <div className="pl-5 mt-3 mb-7  bg-gray-100 rounded">
        {selectedNumberOption === 'number' && (
          <div>
            {' '}
            <br />
            <input
              className="w-10 inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
              type="number"
              onChange={(e) => handleNumberInputChange(Number(e.target.value))}
            />
            <label htmlFor="">명</label>
          </div>
        )}{' '}
        <br />{' '}
      </div>
      <Textarea
        title="어떤 분이 들어오셨으면 좋겠는지 적어주세요"
        onTextChange={handleTextDataChange}
      />
    </div>
  );
}

export default MemberData;
