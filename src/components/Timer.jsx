// Timer.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimerCount, setTimerPlay } from "../redux/Store";

function Timer({ setListData, listData }) {
  const dispatch = useDispatch();
  const timerCount = useSelector((state) => state.timer.timerCount);
  const timerPlay = useSelector((state) => state.timer.timerPlay);

  useEffect(() => {
    console.log("state.selectedData", state.selectedData);
    if (state.selectedData?.totalTimeSpend) {
      setTimerCount(state.selectedData?.totalTimeSpend);
    }
  }, [dispatch]);

  useEffect(() => {
    let intervalId;

    if (timerPlay) {
      intervalId = setInterval(() => {
        dispatch(setTimerCount(timerCount + 1));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerPlay, timerCount, dispatch]);

  const handlePlay = () => {
    dispatch(setTimerPlay(!timerPlay));
  };

  const handleSave = () => {
    setTimerPlay(false);
    let taskList = JSON.parse(localStorage.getItem("taskData"));

    console.log("taskList", taskList);

    let editedData = taskList.map((item) =>
      item.id === state.selectedData?.id
        ? { ...item, totalTimeSpend: timerCount }
        : item
    );
    console.log("editedData", editedData);

    localStorage.setItem("taskData", JSON.stringify(editedData));

    setListData(editedData);

    state.selectedData = null;

    setTimerCount(0);
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-gray-200 p-8 rounded-2xl border-2 shadow-lg mt-5 relative">
          <div className="flex justify-between text-4xl">
            <div>{formatTime(Math.floor(timerCount / 3600))}</div>
            <div>:</div>
            <div>{formatTime(Math.floor((timerCount % 3600) / 60))}</div>
            <div>:</div>
            <div>{formatTime(timerCount % 60)}</div>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-500">HH</span>
            <span className="mx-2">:</span>
            <span className="text-gray-500">MM</span>
            <span className="mx-2">:</span>
            <span className="text-gray-500">SS</span>
          </div>

          <div
            className="absolute right-4 bottom-2 rounded-full"
            onClick={() => handlePlay()}
          >
            {!timerPlay ? "▶️" : "⏸️"}
          </div>
        </div>
        <div className="w-full p-5 flex justify-center ">
          <button
            className="bg-yellow-500 text-white shadow-lg px-3 rounded-lg py-1 "
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

export default Timer;
