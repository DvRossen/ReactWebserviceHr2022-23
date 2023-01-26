import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostEntry } from "./NewEntry";

export default function App() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadJson = async () => {
    setLoading(true);
    try {
      console.log("loading data");
      const response = await fetch("http://145.24.222.157:8000/builds", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const result = await response.json();
      setBuilds(result.items);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBuild = (build) => async () => {
    if (!window.confirm(`Delete ${build.title}?`)) {
      return;
    }
    try {
      await fetch(build._links.self.href, {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      });
      console.info("Build deleted", build);
      await loadJson();
      console.info("Reloaded builds");
      console.log("deletion complete");
    } catch (error) {
      console.error(error);
    }
  };

  const showBuilds = (
    <ul>
      {builds.map((build) => (
        <li key={build.id}>
          <Link to={`/builds/${build.id}`}>{build.title}</Link>{" "}
          <button onClick={deleteBuild(build)}>🗑️</button>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    loadJson();
  }, []);

  return (
    <React.Fragment>
      <header className="App-Header">
        <h1>My Builds</h1>
      </header>
      <section>
        {React.createElement(PostEntry, {
          buildRefreshHandler: loadJson,
        })}
        {loaded && builds.length === 0 ? (
          <h1>No builds currently available</h1>
        ) : (
          showBuilds
        )}
        {loading ? <div>Loading...</div> : null}
      </section>
    </React.Fragment>
  );
}
