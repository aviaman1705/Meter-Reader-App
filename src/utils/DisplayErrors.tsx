export default function DisplayErrors(props: displayErrorsProps) {
  const style = { color: "red", padding: "0.5rem 2rem 0rem 0rem" };
  return (
    <>
      {props.errors ? (
        <ul style={style}>
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

interface displayErrorsProps {
  errors?: string[];
}
