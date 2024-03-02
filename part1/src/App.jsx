const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ part1, part2, part3, exercises1, exercises2, exercises3 }) => (
  <>
    <Part part1={part1} exercises1={exercises1} />
    <Part part2={part2} exercises2={exercises2} />
    <Part part3={part3} exercises3={exercises3} />
  </>
)

const Total = ({ exercises1, exercises2, exercises3 }) => (
  <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
)

const Part = ({ part1, part2, part3, exercises1, exercises2, exercises3 }) => (
  <>
    <p>{part1} {exercises1}</p>
    <p>{part2} {exercises2}</p>
    <p>{part3} {exercises3}</p>
  </>
)

const App = () => {
  const course = 'Half Stack Application Development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App;