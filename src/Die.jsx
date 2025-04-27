export default function Die(props) {
  const imageMap = {
    1: "/images/die-1.png",
    2: "/images/die-2.png",
    3: "/images/die-3.png",
    4: "/images/die-4.png",
    5: "/images/die-5.png",
    6: "/images/die-6.png",
  };
  const imageSrc = imageMap[props.value];
  const styles = {
    backgroundImage: `url(${imageSrc})`,
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
