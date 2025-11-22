const Button = (props) => {
  const { classname, children = "Login", onClick = () => {}, type = "button" } = props;

  return (
    <button className={`px-6 font-semibold ${classname} `} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;