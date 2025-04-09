import React, { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Comments = ({ mediaId }) => {
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log(`comments url: ${BACKEND_URL}/comments/${mediaId}`);
      const res = await fetch(`${BACKEND_URL}/comments/${mediaId}`);
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

  return (
    <div className="p-4">
      <button
        onClick={handleToggle}
        className="text-blue-400 hover:underline text-sm cursor-pointer"
      >
        {visible ? "Hide Comments" : "Show Comments"}
      </button>

      {visible && (
        <div className="mt-3 space-y-2">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="text-sm text-gray-300 border-b border-gray-700 pb-1"
              >
                <p>{comment.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.timestamp).toLocaleString()}
                </p>
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
