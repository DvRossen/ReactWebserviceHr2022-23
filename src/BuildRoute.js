import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Builds } from "./Builds";

export const BuildRoute = (props) => {
  console.info("BuildRoute", props);

  const { buildId } = useParams();
  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadBuild = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `http://145.24.222.157:8000/builds/${buildId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      setBuild(await result.json());
      setLoaded(true);
    } catch (error) {
      console.error(loading);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuild();
  }, [buildId]);

  return (
    <div>
      <Link to="/">Home</Link>
      {loading ? <div>Loading...</div> : null}
      {build ? (
        <section>
          <Builds
            key={build.id}
            build={build}
            url={build._links.self.href}
            loadJson={loadBuild}
          />
        </section>
      ) : null}
    </div>
  );
};
