import PropTypes from "prop-types";

const Total = (props) => {
  return (
    <>
      <p style={{ fontWeight: "bold" }}>Total of {props.totalExercises} exercises</p>
    </>
  );
};

Total.propTypes = {
  totalExercises: PropTypes.number,
};

export default Total;
