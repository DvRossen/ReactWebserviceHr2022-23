import { useState } from "react";
export function Builds(props) {
  console.log(props);

  //visiblity vriables
  const [vis, setVis] = useState(true);
  const editBuild = () => {
    setVis((prev) => !prev);
  };

  //value setters
  const [build, setbuilds] = useState({
    title: "",
    theme: "",
    height: "",
    author: "",
  });
  //   const [title, settitle] = useState(props.build.title);
  const [theme, settheme] = useState(props.build.theme);
  const [height, setheight] = useState(props.build.height);
  const [author, setauthor] = useState(props.build.author);

  //it handles the change
  const onChangeHandler = (event) => {
    setbuilds({ ...build, [event.target.name]: event.target.value });
  };

  //sending your input to brazil
  const editBuildFinish = () => {
    // props.updateBuild;
    setVis((prev) => !prev);
  };

  //sending your input to the bin
  const editBuildCancel = () => {
    setVis((prev) => !prev);
  };

  return (
    <section>
      <h3>{props.build.title}</h3>
      <p>
        Theme: {props.build.theme} Height: {props.build.height}
      </p>
      <p>Author: {props.build.author}</p>
      <button onClick={props.deleteBuild}>Delete </button>{" "}
      {!vis && (
        <form>
          <h2> Edit {props.build.title} </h2>
          <p>
            Title:{" "}
            <input
              type="text"
              value={build.title}
              name="title"
              onChange={onChangeHandler}
            />
          </p>
          <p>
            Theme:{" "}
            <input
              type="text"
              value={build.theme}
              name="theme"
              onChange={onChangeHandler}
            />
          </p>
          <p>
            Height:{" "}
            <input
              placeholder={props.build.height}
              type="text"
              value={build.height}
              name="height"
              onChange={onChangeHandler}
            />
          </p>
          <p>
            Author:{" "}
            <input
              type="text"
              value={build.author}
              name="author"
              onChange={onChangeHandler}
            />
          </p>
        </form>
      )}
      {vis && <button onClick={editBuild}>Edit</button>}
      {!vis && <button onClick={editBuildCancel}>Cancel</button>}
      {!vis && <button onClick={editBuildFinish}>Done</button>}
    </section>
  );
}
