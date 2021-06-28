import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import "./App.css";

function App() {
  const renderRouter = () => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  return (
    <Router>
      <div className="App">{renderRouter()}</div>
    </Router>
  );
}

export default App;
