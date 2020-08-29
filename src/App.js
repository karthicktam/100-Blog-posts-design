import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [fetchedData, setFetchedData] = useState([]);

  const getRandomNr = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  async function getPost() {
    try {
      const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${getRandomNr()}`
      );
      const postData = await postResponse.json();

      const userResponse = await fetch("https://randomuser.me/api");
      const userData = await userResponse.json();

      return { post: postData, user: userData.results[0] };
    } catch (error) {
      return {};
    }
  }

  const fetchPost = () => {
    Promise.all([getPost(), getPost(), getPost()]).then((values) => {
      setFetchedData(values);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div
      className={fetchedData.length === 0 ? "container loading" : "container"}
    >
      <h1>Blog Posts</h1>
      {fetchedData.length === 0 ? (
        <div className="lds-circle">
          <div></div>
        </div>
      ) : (
        fetchedData.map((data) =>
          Object.keys(data).length === 0 ? (
            <div className="error">Error Fetching data re-load...</div>
          ) : (
            <div className="blog-post" key={data.post.id}>
              <h2 className="title">{data.post.title}</h2>
              <p className="text">{data.post.body}</p>
              <div className="user-info">
                <img src={data.user.picture.large} alt={data.user.name.first} />
                <span>
                  {data.user.name.first} {data.user.name.last}
                </span>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
