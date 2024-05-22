function BtnRound(props: any) {
  return (
    <span className={`inline-block overflow-hidden ${props.bgColor} rounded-full`}>
      <button type="button" className="py-2 px-3 text-white">
        {props.text}
      </button>
    </span>
  );
}

export default BtnRound;
