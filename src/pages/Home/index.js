import React from "react";
import { Link } from "react-router-dom";
import { StyledComponent } from "./styles";

function Home(props) {
  return (
    <StyledComponent>
      <Link to="task/list">List Task</Link>
      <Link to="task/add">Add List</Link>
    </StyledComponent>
  );
}

export default Home;
