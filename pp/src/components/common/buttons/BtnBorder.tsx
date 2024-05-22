function BtnBorder(props: any) {
  return (
    <span
      className={`inline-block overflow-hidden border border-solid ${props.bdColor} rounded-full`}
    >
      <button type="button" className={`py-2 px-3 ${props.textColor}`}>
        {props.text}
      </button>
    </span>
  );
}

export default BtnBorder;
