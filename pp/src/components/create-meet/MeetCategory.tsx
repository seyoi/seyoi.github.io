import { useState } from 'react';

interface Chip {
  id: number;
  label: string;
}

interface MeetCategoryChipsProps {
  onSelectedChipsChange: (chips: Chip[]) => void;
}

function MeetCategoryChips({ onSelectedChipsChange }: MeetCategoryChipsProps) {
  const [selectedChips, setSelectedChips] = useState<Chip[]>([]);

  const chips: Chip[] = [
    { id: 1, label: '운동' },
    { id: 2, label: '자기 계발' },
    { id: 3, label: '아웃도어/여행' },
    { id: 4, label: '독서/인문학' },
    { id: 5, label: '음악/악기' },
    { id: 6, label: '문화/예술' },
    { id: 7, label: '스터디' },
    { id: 8, label: '클래스/강의' },
    { id: 9, label: 'N잡' },
  ];

  const handleChipToggle = (id: number) => {
    const chipIndex = selectedChips.findIndex((chip) => chip.id === id);
    if (chipIndex === -1) {
      const chipToAdd = chips.find((chip) => chip.id === id);
      if (chipToAdd) {
        setSelectedChips([...selectedChips, chipToAdd]);
        console.log(selectedChips);
        onSelectedChipsChange([...selectedChips, chipToAdd]);
      }
    } else {
      const updatedChips = [...selectedChips];
      updatedChips.splice(chipIndex, 1);
      setSelectedChips(updatedChips);
      onSelectedChipsChange(updatedChips);
    }
  };
  return (
    <div>
      <br /> <br />
      <div className="mb-4">
        <h3 className="text-xl font-bold">카테고리</h3>
      </div>{' '}
      {chips.map((chip) => (
        <div
          key={chip.id}
          style={{
            display: 'inline-block',
            borderRadius: 20,
            padding: '8px',
            margin: '3px',

            backgroundColor: selectedChips.some((c) => c.id === chip.id) ? 'skyblue' : '#f0f0f0',
            cursor: 'pointer',
            color: selectedChips.some((c) => c.id === chip.id) ? 'white' : 'black', // 선택된 칩일 때 텍스트 색상을 화이트로 설정
          }}
          onClick={() => handleChipToggle(chip.id)}
        >
          {chip.label}
        </div>
      ))}
    </div>
  );
}

export default MeetCategoryChips;
