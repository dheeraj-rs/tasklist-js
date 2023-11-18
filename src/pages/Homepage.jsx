// Homepage.js
import React from 'react';
import TaskListComponent from '../components/TaskListComponent';
import ControllerComponent from '../components/ControllerComponent';

function Homepage() {
  // Additional logic if needed

  return (
    <div className="w-screen xl:h-screen md:flex overflow-hidden">
      <TaskListComponent />
      <ControllerComponent />
    </div>
  );
}

export default Homepage;
