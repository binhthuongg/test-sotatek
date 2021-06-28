import Home from "./pages/Home";
import TaskAdd from "./pages/TaskAdd";
import TaskList from "./pages/TaskList";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/task/add",
    component: TaskAdd,
    exact: true
  },
  {
    path: "/task/list",
    component: TaskList,
    exact: true
  }
];

export default routes;
