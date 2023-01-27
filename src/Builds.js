import React, { useState } from "react";

export function Builds(props) {
  console.log(props);

  const updateBuild = async () => {
    try {
      await fetch(props.url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(build),
      });

      console.info("Build updated", props.url);
      await props.loadJson();
      console.info("Reloaded builds");
      console.log("Builds updated");
    } catch (error) {
      console.error(error);
    }
  };

  //visiblity vriables
  const [vis, setVis] = useState(true);
  const editBuild = () => {
    setVis((prev) => !prev);
    setbuilds({
      title: props.build.title,
      theme: props.build.theme,
      height: props.build.height,
      author: props.build.author,
    });
  };

  //value setters
  const [build, setbuilds] = useState({
    title: "",
    theme: "",
    height: "",
    author: "",
  });

  //it handles the change
  const onChangeHandler = (event) => {
    setbuilds({ ...build, [event.target.name]: event.target.value });
  };

  //sending your input to brazil
  const editBuildFinish = () => {
    setVis((prev) => !prev);
    updateBuild();
  };

  //sending your input to the bin
  const editBuildCancel = () => {
    setVis((prev) => !prev);
  };

  return (
    <React.Fragment>
      <h3>{props.build.title}</h3>
      <p>
        Theme: {props.build.theme} Height: {props.build.height}
      </p>
      <p>Author: {props.build.author}</p>
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
          </p>{" "}
          <button onClick={editBuildFinish}>Finish Edit</button>{" "}
          <button onClick={editBuildCancel}>Cancel</button>
        </form>
      )}
      {vis && <button onClick={editBuild}>Edit</button>}
    </React.Fragment>
  );
}
