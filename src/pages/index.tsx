import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./../styles/App.css";
import Sidebar from "../components/Sidebar";
import Todo from "../components/Todo";

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Sidebar />
        <Todo />
      </div>
    </Provider>
  );
};
export default Home;
