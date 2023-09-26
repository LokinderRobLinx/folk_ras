import React, { useState, useEffect } from 'react';
import "./clock.css"

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const date = new Date();
  // const time = date.toLocaleString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });
  const dateLine = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (

    <div className="justify-content-center w-100">
      <h1 className=" mb-5 text-success">
        <b> Clock App </b>
      </h1>
      <div className="clock-box">
        <div className="clock">
          <div className="hand hour" style={{ transform: `rotate(${(hours / 12) * 360 + (minutes / 60) * 30}deg)` }} />
          <div className="hand minute" style={{ transform: `rotate(${(minutes / 60) * 360}deg)` }} />
          <div className="hand second" style={{ transform: `rotate(${(seconds / 60) * 360}deg)` }} />

          <div className="number number1"><div>1</div></div>
          <div className="number number2"><div>2</div></div>
          <div className="number number3"><div>3</div></div>
          <div className="number number4"><div>4</div></div>
          <div className="number number5"><div>5</div></div>
          <div className="number number6"><div>6</div></div>
          <div className="number number7"><div>7</div></div>
          <div className="number number8"><div>8</div></div>
          <div className="number number9"><div>9</div></div>
          <div className="number number10"><div>10</div></div>
          <div className="number number11"><div>11</div></div>
          <div className="number number12"><div>12</div></div>
        </div>
      </div>
      <br />
      <div>
        <h2>
          <b>
            {hours % 12}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}{' '} {ampm}
          </b>
        </h2>
        <h3 className="dateline">{dateLine}</h3>
      </div>
    </div>
  );
};

export default Clock;
