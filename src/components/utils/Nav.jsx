/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateFilters } from "../PagesData/courseListSlice";

import './Nav.css';
function Nav({ link, title, type }) {
  const data = useSelector((state) => state.courses.courseList);
  const disptach = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  // Function to filter courses based on user input
  const filterCourses = (input) => {
    const userInputLowerCase = input.toLowerCase().trim();
    const searchTerms = userInputLowerCase
      .split(",")
      .map((term) => term.trim());
    if (input === "") {
      return data;
    }

    const filteredCourses = data.filter((course) => {
      return searchTerms.every(
        (term) =>
          course.name.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          course.duration.toLowerCase().includes(term)
      );
    });

    return filteredCourses;
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    const filteredResults = filterCourses(input);
    disptach(updateFilters(filteredResults));
  };

  return (
    <div className="navbar">
      <ul className="nav-part">
        <li className="name">
          <NavLink to="/">Online Tech</NavLink>
        </li>
        {type === "courseDetailPage" ? (
          <li className="search">
            
            <input
              type="text"
             
              placeholder="Enter Course name "
              value={searchInput}
              onChange={handleInputChange}
            />
            <button type="button">Search</button>
          </li>
        ) : (
          ""
        )}
        <li className="dashboard">
          <NavLink to={link}>{title}</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
