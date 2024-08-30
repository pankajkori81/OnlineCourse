import { useDispatch, useSelector } from "react-redux";
import ListCard from "../utils/ListCard";
import Nav from "../utils/Nav";
import { useEffect } from "react";
import './CourseList.css';
import {
  updateCourseList,
  updateError,
  updateFilters,
  updateIsLoading,
} from "../PagesData/courseListSlice";
import Spinner from "../utils/Spinner";

const URL = "https://vinayak9669.github.io/Course-details-api/course.json";
function CourseList() {
  const data = useSelector((state) => state.courses.filters);
  const isLoading = useSelector((state) => state.courses.isLoading);
  console.log(isLoading);

  const disptach = useDispatch();

  useEffect(() => {
    async function fetchData() {
      disptach(updateIsLoading(true));

      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const result = await response.json();
        disptach(updateCourseList(result.courseModule));
        disptach(updateFilters(result.courseModule));
      } catch (error) {
        disptach(updateError(error));
      } finally {
        disptach(updateIsLoading(false));
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="course-part">
          <div className="">
            <Nav
              link="/dashboard"
              title="Dashboard"
              type={"courseDetailPage"}
            />
          </div>
          <div className="courses">
            {data?.map((curCourse) => (
              <ListCard key={curCourse.id} curCourse={curCourse} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CourseList;
