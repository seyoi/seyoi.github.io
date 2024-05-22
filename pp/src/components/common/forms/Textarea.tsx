function Textarea(props: any) {
  return (
    <label className="border border-solid border-ppVeryLightGray rounded overflow-hidden">
      <textarea
        className="p-2 resize-none"
        name={props.name}
        id={props.id}
        placeholder={props.placeholderText}
        cols={props.colsNum}
        rows={props.rowsNum}
      ></textarea>
    </label>
  );
}

export default Textarea;
