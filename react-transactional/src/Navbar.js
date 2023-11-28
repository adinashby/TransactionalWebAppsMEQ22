import React from 'react'

const testVar = "Sample output";
let object1 = {
    "name": "george",
    "id": 1,
};

const navbar = () => {
    return (
        <nav className="navbar">
            <h1>The heading</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/create">New Blog</a>
                <p>{ 565 }</p>
                <p>{ testVar }</p>
                <p>{object1.name}</p>
            </div>
        </nav>
    )
}

export default navbar;
