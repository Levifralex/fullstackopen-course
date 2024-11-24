import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  );
};

Header.propTypes = {
  courseName: PropTypes.string,
};

export default Header;