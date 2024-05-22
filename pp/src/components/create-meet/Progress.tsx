export interface Item {
  title: string;
  description: string;
  runningTime: string;
}

interface ProgressProps {
  items: Item[];
  onItemChange: (index: number, newItem: Item) => void;
}

interface ProgressItemProps {
  index: number;
  item: Item;
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Progress({ items, onItemChange }: ProgressProps) {
  const handleAddItem = () => {
    if (items.length < 15) {
      const newItem: Item = { title: '', description: '', runningTime: '' };
      onItemChange(items.length, newItem);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newItem = { ...items[index], [name]: value };
    onItemChange(index, newItem);
  };

  return (
    <div>
      <br /> <br />
      <div className="mb-4">
        <h3 className="text-xl font-bold">진행 순서 및 시간</h3>
      </div>{' '}
      {items.map((item, index) => (
        <ProgressItem key={index} index={index} item={item} onChange={handleChange} />
      ))}{' '}
      <br />
      <button
        className="p-1 w-10 text-white bg-blue-600 inline-block overflow-hidden rounded"
        onClick={handleAddItem}
      >
        +
      </button>
    </div>
  );
}

function ProgressItem({ index, item, onChange }: ProgressItemProps) {
  return (
    <div>
      {' '}
      {index + 1}
      <input
        className="m-4 inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
        type="text"
        name="title"
        value={item.title}
        onChange={(e) => onChange(index, e)}
        placeholder="Title"
      />
      <input
        className="inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
        type="text"
        name="description"
        value={item.description}
        onChange={(e) => onChange(index, e)}
        placeholder="Description"
      />{' '}
      <input
        type="text"
        className="ml-6 inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
        name="runningTime"
        value={item.runningTime}
        onChange={(e) => onChange(index, e)}
        placeholder="Running Time"
      />
    </div>
  );
}

export default Progress;
