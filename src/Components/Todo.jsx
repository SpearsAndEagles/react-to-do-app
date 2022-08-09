import React from "react";

export default function Todo(props){

    const {description, title, done, deadline} = props.todo;

    return (
        <div className="Todo">
            <h1>{title}</h1>
            {description && <h3>{description}</h3>}

            <hr />
        </div>
    )
}