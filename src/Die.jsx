export default function Die(props) {
  const styles = {
    backgroundImage: `url('/src/assets/die-${props.value}.png')`,
    backgroundSize: "contain",
    boxShadow: props.isHeld ? "inset 0 0 0 3px #0B8043" : "none",
  };

  return (
    <button
      style={styles}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
      id={props.id}
    >
      {/* {props.value} */}
    </button>
  );
}
