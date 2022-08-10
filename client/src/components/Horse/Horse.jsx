import style from "./Horse.module.css";
import horse from "./horse.png";

const Horse = ({ left = { distance: 0 } }) => {
  console.log(left.distance);
  return (
    <div className={style.line} align="center" size="2" color="#ff0000">
      <img
        src={horse}
        width="100px"
        style={{
          transform: `translateX(${left.distance}px) translateY(-50%)`,
        }}
        alt="horse"
        className={style.image}
      ></img>
    </div>
  );
};

export { Horse };
