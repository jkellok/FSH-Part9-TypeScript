interface CourseProps {
  name: string;
  courseParts: CoursePart[];
  totalExercises: number;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
};

interface CoursePartDescription extends CoursePartBase {
  description: string;
};

interface CoursePartBasic extends CoursePartBase, CoursePartDescription {
  kind: "basic"
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
};

interface CoursePartBackground extends CoursePartBase, CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
};

interface CoursePartSpecial extends CoursePartBase, CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = ({courseParts}: { courseParts: CoursePart}) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (courseParts.kind) {
    case "basic":
      return (
        <p>
          <b>{courseParts.name} {courseParts.exerciseCount}</b><br />
          <i>{courseParts.description}</i>
        </p>
      )
    case "group":
      return (
        <p>
          <b>{courseParts.name} {courseParts.exerciseCount}</b><br />
          <i>Project exercises {courseParts.groupProjectCount}</i>
        </p>
      )
    case "background":
      return (
        <p>
          <b>{courseParts.name} {courseParts.exerciseCount}</b><br />
          <i>{courseParts.description}</i><br />
          Submit to: {courseParts.backgroundMaterial}
        </p>
      )
    case "special":
      return (
        <p>
          <b>{courseParts.name} {courseParts.exerciseCount}</b><br />
          <i>{courseParts.description}</i><br />
          Required skills: {courseParts.requirements.join(', ')}
        </p>
      )
    default:
      return assertNever(courseParts);
  }
}

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
};

const Content = ({ courseParts }: CourseProps) => {
  return (
    <div>
      {courseParts.map((c) => (
        <div key={c.name}>
          <Part courseParts={c}/>
        </div>
      ))}
    </div>
  )
};

const Total = ({ totalExercises }: CourseProps) => {
  return <p>Number of exercises {totalExercises}</p>
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} name={""} totalExercises={0} />
      <Total totalExercises={totalExercises} name={""} courseParts={[]} />
    </div>
  );
};

export default App;