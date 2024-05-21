interface CardProps {
  title: string;
  content: string;
  imageUrl?: string;
  width?: string;
  height?: number;
  rounded?: number;
  info: string;
}

const Card = ({
  title,
  content,
  imageUrl = '/assets/logo/landing1.png',
  width = 'full',
  height = 400,
  rounded = 0,
  info = 'info',
}: CardProps) => {
  const roundedStyle = {
    borderRadius: `${rounded}px`,
  };

  return (
    <div
      className="overflow-hidden mx-auto bg-gray-100"
      style={{ width: `${width}px`, height: `${height}px`, ...roundedStyle }}
    >
      {imageUrl && (
        <div
          className="w-full h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="p-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p
          className="overflow-hidden text-base text-gray-700"
          style={{
            maxHeight: '2.5em',
            lineHeight: '1.25em',
            textOverflow: 'ellipsis',
          }}
        >
          {content}
        </p>
        <p
          className="overflow-hidden text-base text-gray-700"
          style={{
            maxHeight: '1.25em',
            lineHeight: '1.25em',
            textOverflow: 'ellipsis',
          }}
        >
          {info}
        </p>
      </div>
    </div>
  );
};

export default Card;
