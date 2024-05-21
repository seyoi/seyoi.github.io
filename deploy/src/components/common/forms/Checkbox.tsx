function Checkbox(props: any) {
  return (
    <label id={props.id} className="inline-block p-2 align-middle">
      <input type="checkbox" name={props.name} id={props.id} />
    </label>
  );
}

export default Checkbox;
