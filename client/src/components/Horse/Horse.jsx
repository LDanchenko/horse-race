import style from "./Horse.module.css";
import horse from "./horse.png";
import { useRef, useEffect } from "react";

const Horse = ({ left, c }) => {
  const distance = left * c;
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  const containerColor = useRef(hex);
  useEffect(() => {
    containerColor.current = hex;
  }, []);

  return (
    <div
      className={style.line}
      style={{
        backgroundColor: `#${containerColor.current}`,
      }}
      align="center"
      size="2"
      color="#ff0000"
    >
      <img
        src={horse}
        width="100px"
        style={{
          transform: `translateX(${distance}px) translateY(-50%)`,
        }}
        alt="horse"
        className={style.image}
      ></img>
    </div>
  );
};

export { Horse };
