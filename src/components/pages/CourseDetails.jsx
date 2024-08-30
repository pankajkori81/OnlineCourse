import { useDispatch, useSelector } from "react-redux";
import Nav from "../utils/Nav";
import { addStudentCourseDetails } from "../PagesData/dashboardSlice";
import AccordionItem from "../utils/AccordianTab";

import './CourseDetails.css';

function CourseDetails() {
  const data = useSelector((state) => state.courses.selectedCourse);
  const studentCourseDetails = useSelector(
    (state) => state.dashboard.studentCourseDetails
  );
  const {
    name,
    instructor,
    description,
    enrollmentStatus,
    duration,
    schedule,
    location,
    prerequisites,
  } = data;

  const dispatch = useDispatch();

  // Function to handle Enroll button
  function handleEnroll() {
    dispatch(addStudentCourseDetails(data));
  }

  // Check if the course is already enrolled
  const isEnrolled = studentCourseDetails.some(
    (course) => course.id === data.id
  );

  // Styling
  const spanStyles = "font-semibold block tracking-wide";
  const sampleImageURL = "https://cdn.dribbble.com/userupload/10453363/file/original-e6f42d19e132fb242764c8ee4a74492a.png?resize=1024x768";

  return (
    <div className="courseDetails">
      <div className="">
        <Nav link={"/dashboard"} title={"Dash Board"} type={"courseDetail"} />
      </div>
      <div className="coursespart">
      
          <img src={sampleImageURL} alt="image"></img>
          <div className="enroll">
          {!isEnrolled && enrollmentStatus !== "Closed" ? (
            <button
              
              onClick={handleEnroll}
            >
              + Enroll
            </button>
          ) : enrollmentStatus === "Closed" ? (
            <button >
              Closed 😪
            </button>
          ) : (
            <button >
              Enrolled
            </button>
          )}
        </div>
        <div className="instruct">
          <h1 className="head">{name}</h1>
          <p className="sub-part">
            <span className="font-bold">Instructor:</span> {instructor}
          </p>
          <p className="sub-part">
            <span className={spanStyles}>Description:</span>
            {description}
          </p>
          <p className="sub-part">
            <span className={spanStyles}>Duration:</span> {duration}
          </p>
          <p className="sub-part">
            <span className={spanStyles}>Schedule:</span> {schedule}
          </p>
          <p className="sub-part">
            <span className={spanStyles}>Location</span> {location}
          </p>
          <p className="sub-part">
            <span className={spanStyles}>Prerequisites:</span>
            {prerequisites.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </p>
          <p className="open-btn">
            <span
              className={`${
                enrollmentStatus === "Open" ? "bg-green-500" : "bg-red-500"
              } px-3 p-1 text-white font-medium rounded-md`}
            >
              {enrollmentStatus}
            </span>
            <span className="week-btn">
              {duration}
            </span>
          </p>
        </div>
      </div>
      <div className="syllabus">
        <h2 >
          Syllabus
        </h2>
        <div className="syllabus-part">
          {data.syllabus.map(({ week, topic, content }) => (
            <AccordionItem className="drop-part"
              key={week}
              week={week}
              topic={topic}
              content={content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
