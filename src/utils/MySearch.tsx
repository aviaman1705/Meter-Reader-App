export default function MySearch(props: mySearchProps) {
  let input: any = "";

  const handleClick = () => {
    props.onSearch(input.value);
  };

  return (
    <div>
      <input
        // className="form-control"
        placeholder="חפש..."
        // style={{ backgroundColor: "pink" }}
        ref={(n) => (input = n)}
        type="text"
      />
      <button className="btn btn-warning" onClick={handleClick}>
        חפש
      </button>
    </div>
  );
}

interface mySearchProps {
  onSearch(value: any): void;
}
