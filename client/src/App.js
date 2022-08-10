import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRaceData, setError } from "./redux/";
import { Horse } from "./components/Horse";
import { io } from "socket.io-client";
import style from "./App.module.css";

const socket = io("http://localhost:3002");

function App() {
  const dispatch = useDispatch();
  const race = useSelector((state) => state.race);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const vw = (window.innerWidth - 100) / 1000;
  useEffect(() => {
    socket.on("connect_error", (error) => {
      if (error) {
        socket.disconnect();
        const err = error.message;
        dispatch(setError({ err }));
        return;
      }
    });
    socket.emit("start");
    socket.on("ticker", (data) => {
      console.log(data.map((el) => el.distance));

      if (data.find((el) => el.distance === 1000)) {
        dispatch(setRaceData({ data }));
        socket.disconnect();
        return;
      }
      dispatch(setRaceData({ data }));
      setIsConnected(true);
    });

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, []);

  return (
    <div className={style.App}>
      {isConnected && (
        <ul className={style.list}>
          {race.map((race) => (
            <li className={style.item} key={race.name}>
              <Horse left={race.distance} c={vw} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
