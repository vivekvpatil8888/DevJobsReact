import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const URL = "https://jobs.github.com/positions.json";
// const URL = "https://jsonplaceholder.typicode.com/todos";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const JobsSection = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);
  const [position, setPosition] = useState([]);

  const fetchAllJobs = () => {
    fetch(proxyurl + URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => console.log("Went wrong: " + e));
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("location value: " + location);
    console.log("search value: " + search);
    console.log("fulltime value: " + fulltime);
    if (location && search) {
      searchJobs("location=" + location + "&search=" + search);
    }
    if (location) {
      console.log("about to submit");
      searchJobs("location=" + location);
    } else if (search) {
      searchJobs("search=" + search);
      console.log("nothing for now");
    }
  };

  const searchJobs = (query) => {
    const searchURL = proxyurl + URL + "?";
    fetch(searchURL + query + "&full_time=" + fulltime)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.log("went wrong:" + e));
  };

  const getPositionById = (id) => {
    const searchURL = proxyurl + `https://jobs.github.com/positions/${id}.json`;
    fetch(searchURL)
      .then((response) => response.json())
      .then((data) => {
        setPosition(data);
      })
      .catch((e) => console.log("went wrong:" + e));
  };

  return (
    <>
      <div class="main">
        <div id="searchform">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                placeholder="Filter by title, companies, expertise..."
                id="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Filter by location.."
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="checkbox"
                id="fulltime"
                name="fulltime"
                checked={fulltime}
                onChange={(e) => setFulltime(e.target.checked)}
              />
              Full Time Only
            </div>
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="grid">
          {data.map((job) => {
            return (
              <>
                {/* <Link to={`/positions/${job.id}`}> */}
                <div className="job" key={job.id} onClick={getPositionById}>
                  <img src={job.url} alt="description" />
                  <h4>
                    {job.created_at} ago . {job.type}
                  </h4>
                  <h2>{job.title}</h2>
                  <h4>{job.company}</h4>
                  <h5>{job.location}</h5>
                </div>
                {/* </Link> */}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JobsSection;
