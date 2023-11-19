import { proxy } from "valtio";

import TaskListComponent from "../components/TaskListComponent";
import ControllerComponent from "../components/ControllerComponent";
import { useState } from "react";


export const state = proxy({
    userId: "",
    calenderDate: null,
    formToggle: false,
    selectedData: null,
  });

function Homepage() {

    const [listData, setListData] = useState([]);

    return (
      <div className="w-screen xl:h-screen md:flex overflow-hidden">
        <TaskListComponent listData={listData} setListData={setListData} />
        <ControllerComponent setListData={setListData} listData={listData} />
      </div>
    );
}

export default Homepage