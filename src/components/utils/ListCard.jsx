import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSelectedCourse } from "../PagesData/courseListSlice";
import ProgressBar from "./ProgressBar";
import { updateCourseCompletion } from "../PagesData/dashboardSlice";

import './ListCard.css';

/* eslint-disable react/prop-types */
function ListCard({ curCourse, type }) {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const sampleImageURL ="https://cdn.dribbble.com/userupload/5580002/file/original-714bd0ef60c3253f12c48aa8bc362097.png?crop=0x0-3439x2579&resize=400x300&vertical=center"

  const {
    id,
    name,
    instructor,
    description,
    enrollmentStatus,
    duration,
    courseComplete,
  } = curCourse;

  function handleOnClick() {
    disptach(updateSelectedCourse(curCourse));
    navigate("/course-details");
  }

  function handleDashboardCourseClick() {
    disptach(updateCourseCompletion(id));
  }

  return (
    <div className="lists">
      <div className="list-card">
        <div className="">
          <img src={sampleImageURL} alt="image"></img>
        </div>
        <div className="">
          <h2 className="">{name}</h2>
          <p className="">
            {instructor}
          </p>
          <p className="">{description}</p>
          {type !== "dashboard" ? (
            <div className="duration">
              <span
                className={`${
                  enrollmentStatus === "Open" ? "bg-green-500" : "bg-red-500"
                } px-3 p-1 text-white font-medium rounded-md`}
              >
                {enrollmentStatus}
              </span>
              <span className="week-part">
                {duration}
              </span>
              <span
                className="deatil-part"
                onClick={() => handleOnClick()}
              >
                Details →
              </span>
            </div>
          ) : (
            <div className="due-in">
              <p>
                <span className="font-semibold">Due in:</span>
                {duration}
              </p>
              <ProgressBar courseCompleted={courseComplete} />
              {courseComplete ? (
                <button
                  onClick={() => handleDashboardCourseClick()}
                  className="complete"
                >
                  Completed 😍
                </button>
              ) : (
                <button
                  onClick={() => handleDashboardCourseClick()}
                  className="complete-course"
                >
                  Complete the Course
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCard;
