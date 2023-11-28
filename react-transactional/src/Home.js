import { useState } from 'react';

const Home = () => {
    //let name = "James";
    const [name, setName] = useState('James');

    const handleClick = () => {
        setName("Jordan");
        // console.log(name);
    }

    return (
        <div className="home">
            <h2>Homepage</h2>
            <p>{ name }</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default Home;
