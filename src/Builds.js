import { useState } from "react";

export function Builds(props) {
  console.log(props);

  const updateBuild = (event) => async () => {
    event.preventDefault();
    try {
      fetch(props.url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editbuild),
      });

      console.info("Build deleted", props.url);
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
  };

  //value setters
  const [editbuild, seteditbuilds] = useState({
    title: "",
    theme: "",
    height: "",
    author: "",
  });

  //it handles the change
  const onChangeHandler = (event) => {
    seteditbuilds({ ...editbuild, [event.target.name]: event.target.value });
  };

  //sending your input to brazil
  const editBuildFinish = () => {
    console.log(props.url);
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
              value={editbuild.title}
              name="title"
              onChange={onChangeHandler}
            />
          </p>
          <p>
            Theme:{" "}
            <input
              type="text"
              value={editbuild.theme}
              name="theme"
              onChange={onChangeHandler}
            />
          </p>
          <p>
            Height:{" "}
            <input
              type="text"
              value={editbuild.height}
              name="height"
              onChange={onChangeHandler}
            />
          </p>
          <p>
            Author:{" "}
            <input
              type="text"
              value={editbuild.author}
              name="author"
              onChange={onChangeHandler}
            />
          </p>
        </form>
      )}
      {vis && <button onClick={editBuild}>Edit</button>}
      {!vis && <button onClick={editBuildCancel}>Cancel</button>}
      {!vis && <button onClick={editBuildFinish}>Finish Edit</button>}
    </section>
  );
}
