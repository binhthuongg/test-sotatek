import React from "react";
import TaskSingle from "../../components/TaskSingle";
import { StyledComponent } from "./styles";

function TaskAdd(props) {
  return (
    <StyledComponent>
      <h3 className="title">New Task</h3>
      <TaskSingle />
    </StyledComponent>
  );
}

export default TaskAdd;
