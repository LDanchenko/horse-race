import style from "./Horse.module.css";
import horse from "./horse.png";
import { useRef, useEffect } from "react";

const Horse = ({ distance, percent }) => {
  const distanceX = distance * percent;
  const hexColor = Math.floor(Math.random() * 16777215).toString(16);
  const containerColor = useRef(hexColor);
  useEffect(() => {
    containerColor.current = hexColor;
  }, []);

  return (
    <div
      className={style.line}
      style={{
        backgroundColor: `#${containerColor.current}`,
      }}
    >
      <img
        src={horse}
        width="100px"
        style={{
          transform: `translateX(${distanceX}px) translateY(-50%)`,
        }}
        alt="horse"
        className={style.image}
      ></img>
    </div>
  );
};

export { Horse };
