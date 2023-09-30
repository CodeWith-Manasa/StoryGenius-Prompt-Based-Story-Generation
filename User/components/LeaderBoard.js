import React from "react";
import { useEffect, useState } from "react";
import "../App.css";

export default function LeaderBoard() {
  const [Stories, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const handleupvote = async (item) => {
    const Id = item._id;
    const updatedChatLog = Stories.map((message) => {
      if (message._id === Id) {
        return { ...message, UpVote: message.UpVote + 1 };
      }
      return message;
    });
   
    setData(updatedChatLog);
    const response = await fetch("http://localhost:3001/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Story: item.Story,
      }),
    });
    const data = await response.json();
   
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/LeaderBoard");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Process the data or set it in your component's state
      setData(data);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Top Stories</h1>
      <div className="row">
        {Stories.map((item) => (
          <div className="col-md-12 boarder" key={item._id}>
            <div className="card mb-12">
              <div className="card-body" style={{ color: "white" }}>
                <h5 className="card-title">Prompt</h5>
                <p className="card-text">{item.Prompt}</p>
                <h5 className="card-title">Story</h5>
                <p className="card-text">{item.Story}</p>
                <h5
                  className="card-title upvote"
                  onClick={() => handleupvote(item)}
                >
                  👍
                </h5>
                <p className="card-text upvote1">{item.UpVote}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
