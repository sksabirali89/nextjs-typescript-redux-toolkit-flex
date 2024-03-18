
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleList,
  faPlus,
  faChildRifle,
  faUsersLine,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import profileImage from "./../assets/Profile-Avatar-PNG.png";
import { IMPORTANT, TASKS,COMPLETED } from "../redux/todo/categories";
import { changeSelectedCategory } from "../redux/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

interface Category {
  [IMPORTANT]: string[];
  [TASKS]: string[];
  [COMPLETED]: string[];
}
interface TodoState extends Category {
  selectedCategory: keyof Category;
}

interface RootState {
  todos: TodoState;
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const [responsiveMenuVisibility, setResponsiveMenuVisibility] =
    useState(false);
  const toggleMenu = () => {
    setResponsiveMenuVisibility(!responsiveMenuVisibility);
  };

  const onSelectMenu = (category:keyof Category) => {
    dispatch(changeSelectedCategory(category));
  };
  const todos = useSelector((state:RootState) => state.todos);

  return (
    <>
      <div className={`leftside box ${responsiveMenuVisibility ? "" : "hide"}`}>
        <div className="leftside-top">
          <div className="menu-item">
            <div className="user-logo">
              <Image
                src={profileImage}
                alt="micro todo nextjs Logo"
                width={50}
                height={50}
                priority
              />
            </div>
            <div className="user-details">
              <div>John Doe</div>
              <small>john.doe@shell.com</small>
            </div>
          </div>
          <div className="menu-item">
            <input
              type="text"
              placeholder="Search"
              className="menu-search-input"
            />
          </div>
        </div>
        <div className="leftside-middle">
          <div className="leftside-middle-scroll">
            <div className="divider"></div>
            <div className="menu-item">
              <div className="menu-item-left">
                <FontAwesomeIcon icon={faUsersLine} className="font-icon" />

                <button
                  className="menu-button"
                  onClick={() => onSelectMenu(TASKS)}
                >
                  {TASKS}
                </button>
              </div>
              <div className="menu-item-right">
                <span className="item-count">{todos[TASKS].length}</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-item-left">
                <FontAwesomeIcon icon={faChildRifle} className="font-icon" />

                <button
                  className="menu-button"
                  onClick={() => onSelectMenu(IMPORTANT)}
                >
                  {IMPORTANT}
                </button>
              </div>
              <div className="menu-item-right">
                <span className="item-count">{todos[IMPORTANT].length}</span>
              </div>
            </div>

            <div className="divider"></div>
            <div className="menu-item">
              <div className="menu-item-left">
                <FontAwesomeIcon icon={faRectangleList} className="font-icon" />
                New List Sample
              </div>
              <div className="menu-item-right">
                <span className="item-count">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="leftside-bottom bottom-menu">
          <div className="divider"></div>
          <div className="menu-item">
            <div className="menu-item-left">
              <FontAwesomeIcon icon={faPlus} className="font-icon" />
              New List
            </div>
            <div className="menu-item-right">
              <span className="item-count">0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive-menu">
        <FontAwesomeIcon
          icon={faBars}
          className="responsive-menu-icon font-icon"
          onClick={toggleMenu}
        />
      </div>
    </>
  );
};

export default Sidebar;
