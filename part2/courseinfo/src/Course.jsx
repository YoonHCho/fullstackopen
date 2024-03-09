const Header = ({ content }) => <h1>{content}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return <p>Total of {total} exercises</p>
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>
)

const Course = ({ course }) => (
  <>
    <Header content={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course;