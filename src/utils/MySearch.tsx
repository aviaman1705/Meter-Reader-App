import Button from "./Button";

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
      <Button className="btn btn-warning" title="חפש" onClick={handleClick}>
        חפש
      </Button>
    </div>
  );
}

interface mySearchProps {
  onSearch(value: any): void;
}
