//pass in text to props
interface Props {
  children: string;
  onButtonPress: () => void;
  color?: "primary" | "secondary" | "danger" | "success";
}

const Button = ({ children, onButtonPress, color = "primary" }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={() => {
        onButtonPress();
      }}
    >
      {" "}
      {children}
    </button>
  );
};

export default Button;
