function BtnLarge(props: any) {
  return (
    <span className={`block overflow-hidden ${props.bgColor} rounded`}>
      <button
        onClick={props.onClick}
        type="button"
        className="w-full py-4 px-4 text-lg text-white font-bold text-center"
      >
        {props.text}
      </button>
    </span>
  );
}

export default BtnLarge;
