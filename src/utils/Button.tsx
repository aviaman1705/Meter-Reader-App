export default function Button(props: buttonProps) {
  return (
    <>
      <button
        id={props.id}
        type={props.type}
        className={props.className}
        title={props.title}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}

interface buttonProps {
  id: string;
  className: string;
  onClick?(): void;
  disabled: boolean;
  children: React.ReactNode;
  type: "button" | "submit";
  title: string;
}

Button.defaultProps = {
  id: "",
  className: "",
  type: "button",
  disabled: false,
  title: "",
};
