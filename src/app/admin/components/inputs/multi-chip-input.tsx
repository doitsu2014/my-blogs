import { useState } from 'react';

export const getRandomColor = () => {
  const colors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-neutral',
    'bg-base-200',
    'bg-base-300',
    'bg-info',
    'bg-success',
    'bg-warning',
    'bg-error'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function MultiChipInput({
  chips,
  setChips,
  className
}: {
  chips: { label: string; color: string }[];
  setChips: (chips: { label: string; color: string }[]) => void;
  className?: string;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const newChips = inputValue
        .split(',')
        .map((chip) => chip.trim())
        .filter((chip) => chip !== '' && !chips.some((c) => c.label === chip))
        .map((chip) => ({ label: chip, color: getRandomColor() }));

      setChips([...chips, ...newChips]);
      setInputValue('');
    }
  };

  const removeChip = (chipToRemove: string) => {
    setChips(chips.filter((chip) => chip.label !== chipToRemove));
  };

  return (
    <div className={className}>
      {chips.map((chip, index) => (
        <div
          key={index}
          className={`inline-flex items-center px-2 py-1 rounded-full text-white ${chip.color}`}
        >
          <span className="mr-2">{chip.label}</span>
          <button
            className="text-white hover:text-gray-300 font-bold"
            onClick={() => removeChip(chip.label)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Enter items..."
        className="outline-none border-none flex-grow"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
