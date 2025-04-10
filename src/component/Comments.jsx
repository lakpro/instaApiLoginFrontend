import React, { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Comments = ({ mediaId }) => {
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyInputs, setReplyInputs] = useState({}); // reply input per comment
  const [replyVisible, setReplyVisible] = useState({}); // visibility per comment

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/comments/${mediaId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setComments(data.data || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!visible && comments.length === 0) {
      fetchComments();
    }
    setVisible(!visible);
  };

  const handleReplyToggle = (commentId) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyChange = (commentId, value) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const sendReply = async (commentId) => {
    const message = replyInputs[commentId];
    if (!message) return;
    console.log("Sending reply:", message);
    console.log("Comment ID:", commentId);
    try {
      const res = await fetch(`${BACKEND_URL}/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment_id: commentId, message }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Reply sent!");
        fetchComments(); // Refresh comments after sending a reply
        setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
        setReplyVisible((prev) => ({ ...prev, [commentId]: false }));
      } else {
        console.log("Failed to send reply.");
      }
    } catch (err) {
      console.error("Reply failed:", err);
      //   alert("Error sending reply.");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleToggle}
        className="text-blue-400 hover:underline text-sm cursor-pointer"
      >
        {visible ? "Hide Comments" : "Show Comments"}
      </button>

      {visible && (
        <div className="mt-3 space-y-4">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="text-sm text-gray-300 border-b border-gray-700 pb-2"
              >
                <p>{comment.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.timestamp).toLocaleString()}
                </p>

                <button
                  onClick={() => handleReplyToggle(comment.id)}
                  className="text-blue-400 text-xs mt-1 hover:underline"
                >
                  {replyVisible[comment.id] ? "Cancel" : "Reply"}
                </button>

                {replyVisible[comment.id] && (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={replyInputs[comment.id] || ""}
                      onChange={(e) =>
                        handleReplyChange(comment.id, e.target.value)
                      }
                      className="w-full p-2 text-sm text-black rounded bg-gray-200"
                      placeholder="Write your reply..."
                    />
                    <button
                      onClick={() => sendReply(comment.id)}
                      className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No comments found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
