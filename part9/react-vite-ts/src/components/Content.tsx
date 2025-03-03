import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[]
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Content = (props: ContentProps) => {

    props.courseParts.forEach(part => {
        switch(part.kind) {
            case "basic":
                console.log(part.name, part.description, part.exerciseCount);
                break;
            case "group":
                console.log(part.name, part.exerciseCount, part.groupProjectCount);
                break;
            case "background":
                console.log(part.name, part.description, part.exerciseCount, part.backgroundMaterial);
                break;
            default:
                return assertNever(part);
        }
    })

    return(
        <>
            {props.courseParts.map((course) => (
                <p>
                    {course.name} {course.exerciseCount}
                </p>
            ))}
        </>
    );
}

export default Content;