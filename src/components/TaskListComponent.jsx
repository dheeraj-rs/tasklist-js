import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setListData,
  setFormState,
  resetFormState,
  selectFormState,
  selectListData,
} from '../redux/Store';
import Addform from "./Addform";
import TaskCard from "./TaskCard";

const TaskListComponent = () => {
  const dispatch = useDispatch();
  const listData = useSelector(selectListData);
  const formState = useSelector(selectFormState);
  const [userid, setUserid] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    try {
      const storedData = localStorage.getItem("taskData");
      if (storedData) {
        dispatch(setListData(JSON.parse(storedData)));
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error fetching data");
    }
  };

  const handleAdd = useCallback(() => {
    dispatch(setFormState({ ...formState, date: Date.now(), id: Date.now() }));
    dispatch(setListData([...listData, formState]));
    dispatch(resetFormState());
    setShowForm(true);
    fetchTodos();
  }, [formState, listData]);

  // useEffect(() => {
  //   setUserid(state.userId);
  // }, []);

  useEffect(() => {
    const calenderSelectDate = subscribe(state, () => {
      setSelectDate(state.calenderDate || new Date());
    });
    return () => calenderSelectDate();
  }, []);

  useEffect(() => {
    const toggleEditBtn = subscribe(state, () => {
      setShowForm(state.formToggle || false);
    });
    return () => toggleEditBtn();
  }, []);

  return (
    <section className="w-full md:min-w-[calc(100vw-55vw)] pt-5 xl:p-14 text-[#47425b] md:order-2">
      <main className="flex min-w-max px-5 mb-12 relative">
      <header className="w-full">
          <h1 className="text-3xl leading-[60px] tracking-normal md:text-2xl lg:text-4xl">
            Today's schedule
          </h1>
          <aside className="flex items-center gap-4  mt-3">
            {/* show selected Date */}
            <h1 className="text-3xl leading-[50px] tracking-wide text-[#f5bd6c] md:text-2xl lg:text-4xl w-52 lg:w-64">
              {selectDate.toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
              })}
            </h1>
          </aside>
        </header>
        <button
          className="w-14 h-14 logobox text-2xl font-extrabold flex items-center justify-center cursor-pointer select-none active:bg-[#fcc22f] bg-[#f7d57e] text-white md:w-10 md:h-10 md:text-xl lg:text-2xl lg:w-14 lg:h-14"
          onClick={handleAdd}
        >
          ＋
        </button>
        <div
          className={`${
            showForm
              ? "opacity-100 right-0 transition-all duration-1000"
              : "hidden right-[-100px] transition-all duration-1000"
          } absolute z-50 top-24 shadow-lg shadow-[#3454742a]`}
        >
          <Addform fetchTodos={() => fetchTodos()} />
        </div>
      </main>
      <main className="h-[calc(100vh-24vh)] rounded-xl flex flex-col gap-3 overflow-y-scroll p-5 relative ">
        {listData.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </main>
    </section>
  );
};

export default TaskListComponent;
