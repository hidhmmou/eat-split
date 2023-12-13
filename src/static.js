// Projects.js
import React from "react";
import "./Project.css";

const projects = [
    {
        title: "Guess My Number",
        description: "Guessing a random number; every guess costs one point.",
        link: "https://hidhmmou.rankupy.com/guessMyNbr/index.html",
    },
    {
        title: "Pig Game",
        description: "Two-player game; the first one gaining 100pts wins.",
        link: "https://hidhmmou.rankupy.com/pigGame/index.html",
    },
    {
        title: "Weather App",
        description:
            "Weather Application, input your city, hit enter, is it rainy or cloudy?",
        link: "https://hidhmmou.rankupy.com/weatherApp/index.html",
    },
    {
        title: "To-Do App",
        description: "To-Do application",
        link: "https://hidhmmou.rankupy.com/To-Do/index.html",
    },
    {
        title: "Quiz App",
        description: "Simple Quiz App",
        link: "https://hidhmmou.rankupy.com/quiz/index.html",
    },
    {
        title: "Travel App",
        description: "My First React Travel App",
        link: "",
    },
    {
        title: "Tip Calculator App",
        description: "React tip calculator application",
        link: "https://ywn8gk.csb.app/",
    },
    // Add more project objects as needed
];

const App = () => {
    return (
        <React.Fragment>
            <header>
                <h1>My Projects :</h1>
            </header>
            <div className="container">
                {projects.map((project, index) => (
                    <a href={project.link} className="project" key={index}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </a>
                ))}
            </div>
        </React.Fragment>
    );
};

export default App;
