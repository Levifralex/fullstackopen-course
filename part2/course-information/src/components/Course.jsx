import PropTypes from "prop-types";
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = (props) => {

  const totalExercises = props.course.parts.reduce((a ,v) => a + v.exercises , 0)  

  return (
    <>
      <Header courseName={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
      <Total totalExercises={totalExercises}></Total>
    </>
  );
};

Course.propTypes = {
  course: PropTypes.any,
};

export default Course;