function BtnSmall(props: any) {
  return (
    <span className={`inline-block overflow-hidden ${props.bgColor} rounded`}>
      <button type="button" className="py-1 px-2 text-white">
        {props.text}
      </button>
    </span>
  );
}

export default BtnSmall;
