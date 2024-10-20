export default function Loading(props: loadingProps) {
  return (
    <img
      alt="loading"
      src="../../loader.gif"
      style={{
        position: "absolute",
        left: props.left,
        top: props.top,
        width: "80px",
        height: "80px",
        zIndex: 2,
      }}
    />
  );
}

interface loadingProps {
  left: string;
  top: string;
}

Loading.defaultProps = {
  left: "65%",
  top: "30%",
};
