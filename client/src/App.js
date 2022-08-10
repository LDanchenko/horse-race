import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRaceData, setError } from "./redux/";
import horse from "./horse.png"; // with import
import { io } from "socket.io-client";
import "./App.css";
const socket = io("http://localhost:3002");

function App() {
  const dispatch = useDispatch();
  const stat = useSelector((state) => state);
  useEffect(() => {
    let counter = 0;

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
      console.log(data);
      counter += 1;
      if (counter === 10) {
        socket.disconnect();
        return;
      }
      console.log(counter);
      dispatch(setRaceData({ data }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  console.log(stat);

  return (
    <div className="App">
      <br />
      {/* <img src={horse} width="100px"></img>
      <hr align="center" width="100%vw" size="2" color="#ff0000" />
      <br />
      <hr align="left" width="100%vw" size="4" color="#ff9900" />
      <br />
      <hr align="right" width="100%vw" size="3" color="#0000dd" /> */}
    </div>
  );
}

export default App;
