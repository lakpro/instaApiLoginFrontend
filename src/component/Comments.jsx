import React, { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Comments = ({ mediaId }) => {
  const [comments, setComments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});
  const [replyVisible, setReplyVisible] = useState({});

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/comments/${mediaId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      const topLevel = [];
      const repliesMap = {};

      data.forEach((comment) => {
        if (comment.parent_id) {
          if (!repliesMap[comment.parent_id])
            repliesMap[comment.parent_id] = [];
          repliesMap[comment.parent_id].push(comment);
        } else {
          topLevel.push(comment);
        }
      });

      Object.keys(repliesMap).forEach((key) => {
        repliesMap[key].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
      });

      const nested = topLevel.map((comment) => ({
        ...comment,
        replies: repliesMap[comment.id] || [],
      }));

      setComments(nested);
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

  const [replySending, setReplySending] = useState({});

  const sendReply = async (commentId) => {
    const message = replyInputs[commentId];
    if (!message) return;
    try {
      setReplySending((prev) => ({ ...prev, [commentId]: true }));
      const res = await fetch(`${BACKEND_URL}/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment_id: commentId, message }),
      });
      const data = await res.json();
      if (data.success) {
        fetchComments();
        setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
        setReplyVisible((prev) => ({ ...prev, [commentId]: false }));
      } else {
        console.log("Failed to send reply.");
      }
    } catch (err) {
      console.error("Reply failed:", err);
    } finally {
      setReplySending((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  return (
    <div className="p-4">
      <div
        onClick={handleToggle}
        className="font-bold  cursor-pointer text-rose-500 hover:text-rose-300 hover:underline"
      >
        {visible ? "Hide Comments" : "Show Comments"}
      </div>

      {visible && (
        <div className="mt-4 space-y-6">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-black/30 backdrop-blur-md rounded-xl p-4  text-sm text-gray-100 shadow-lg"
              >
                <p className="font-bold text-white p-1">
                  {comment.from.username}
                </p>
                <p className="text-gray-300 p-1">{comment.text}</p>
                <p className="text-xs text-gray-500 p-1">
                  {new Date(comment.timestamp).toLocaleString()}
                </p>

                <button
                  onClick={() => handleReplyToggle(comment.id)}
                  className="font-bold  cursor-pointer  text-rose-500 hover:text-rose-300 hover:underline"
                >
                  {replyVisible[comment.id] ? "Cancel" : "Reply"}
                </button>

                {replyVisible[comment.id] && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      disabled={replySending[comment.id]}
                      value={replyInputs[comment.id] || ""}
                      onChange={(e) =>
                        handleReplyChange(comment.id, e.target.value)
                      }
                      className="w-full p-2 text-sm text-white rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400"
                      placeholder="Write your reply..."
                    />
                    <button
                      onClick={() => sendReply(comment.id)}
                      disabled={replySending[comment.id]}
                      className={`text-white text-xs px-4 py-2 rounded-full transition-transform duration-300 ${
                        replySending[comment.id]
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-105 cursor-pointer"
                      }`}
                      style={{
                        background:
                          "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
                      }}
                    >
                      {replySending[comment.id] ? "Sending..." : "Send"}
                    </button>
                  </div>
                )}

                {comment.replies.length > 0 && (
                  <div className="ml-4 mt-4 space-y-4  border-white/10 pl-4">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-black/20 backdrop-blur rounded-lg p-3 text-sm text-gray-300"
                      >
                        <p className="font-semibold text-white p-1">
                          {reply.from.username}
                        </p>
                        <p className="p-1">{reply.text}</p>
                        <p className="text-xs text-gray-500 p-1">
                          {new Date(reply.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
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
