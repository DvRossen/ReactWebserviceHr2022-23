import { useState } from "react";

export function PostEntry(props) {
  console.log(props);
  //sends the POST request
  const postEntry = (event) => {
    event.preventDefault();
    fetch("http://145.24.222.157:8000/builds", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(build),
    }).then((response) => props.buildRefreshHandler());
    console.log("Builds updated");
  };
  //sets the value of build
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

  return (
    <section>
      <h2>Add new entry</h2>
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
      </p>
      <button onClick={postEntry}>Post Cringe</button>
    </section>
  );
}
