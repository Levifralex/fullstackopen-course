import PropTypes from 'prop-types';

const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  };

  const totalExercises = course.parts.reduce((a ,v) => a + v.exercises , 0)

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total totalExercises={totalExercises}></Total>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

Header.propTypes = {
  course: PropTypes.string
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </>
  )
}

Content.propTypes = {
  parts: PropTypes.array
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

Part.propTypes = {
  part: PropTypes.any
};


const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.totalExercises}</p>
    </>
  )
}

Total.propTypes = {
  totalExercises: PropTypes.number
};

export default App