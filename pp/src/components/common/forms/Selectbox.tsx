function Selectbox(props: any) {
  return (
    <select className="p-2 border border-solid border-ppVeryLightGray rounded overflow-hidden">
      {props.options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Selectbox;
