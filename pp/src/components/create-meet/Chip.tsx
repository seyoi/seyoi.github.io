import { useState } from 'react';

interface ChipProps {
  id?: string;
  name?: string;
  onSelect?: (id: string, selected: boolean) => void;
}

function Chip({ id = 'default id', name = 'default name', onSelect = () => {} }: ChipProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onSelect(id, !selected);
  };

  return (
    <div
      style={{
        padding: '8px',
        margin: '5px',
        backgroundColor: selected ? 'blue' : '#f0f0f0',
        cursor: 'pointer',
        width: 'max-content',
        borderRadius: '10px',
        color: 'gray',
      }}
      onClick={handleClick}
    >
      {name}
    </div>
  );
}

export default Chip;
