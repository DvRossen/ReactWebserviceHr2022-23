import { useEffect, useState } from "react";
import { Builds } from "./Builds";
import { PostEntry } from "./NewEntry";

export default function App() {
  const [builds, setBuilds] = useState([]);

  const loadJson = () => {
    console.log("loading data");
    fetch("http://145.24.222.157:8000/builds", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setBuilds(result.items));
  };

  const deleteBuild = (url) => async () => {
    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      });
      console.info("Build deleted", url);
      await loadJson();
      console.info("Reloaded builds");
      console.log("deletion complete");
    } catch (error) {
      console.error(error);
    }
  };

  const showBuilds = builds.map((value, key) => (
    <Builds
      key={value.id}
      build={value}
      deleteBuild={deleteBuild(value._links.self.href)}
      url={value._links.self.href}
      loadJson={loadJson()}
    />
  ));

  useEffect(loadJson, []);

  return (
    <section>
      <h1>My Builds</h1>
      <PostEntry buildRefreshHandler={loadJson} />
      {showBuilds}
    </section>
  );
}
