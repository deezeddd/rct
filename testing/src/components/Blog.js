import React, { useState } from "react";

export default function Blog({ blogs, setBlogs }) {
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEdit = (id, currentText) => {
    setEditingBlogId(id);
    setEditedText(currentText); 
  };

  const handleSave = async (id) => {
    if (editedText !== null && editedText?.length > 0) {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editedText }),
      });
      if (response.ok) {
        const updatedBlogs = await response.json();
        setBlogs(updatedBlogs);
        setEditingBlogId(null);
      }
      else{
        console.error("Failed to Edit blog");
      }
    } else {
      console.log("Blog can't be empty");
    }

  };

  // Handle delete
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedBlogs = await response.json();
      setBlogs(updatedBlogs); // Update the list after deletion
    }
  }

  return (
    <div className="p-3">
      <ul>
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <li key={blog.blogId} className="mb-4">
              <div className="flex justify-between items-center">
                {/* If the blog is being edited */}
                {editingBlogId === blog.blogId ? (
                  <div className="flex">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="border p-2"
                    />
                    <button
                      className="text-green-500 ml-2"
                      onClick={() => handleSave(blog.blogId)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span>{blog.text}</span>
                )}

                <div>
                  <button
                    className={`text-blue-500 hover:underline mr-2 disabled: ${
                      editingBlogId === blog.blogId ? 'disabled hover:no-underline text-gray-400':''
                    }`}
                    onClick={() => handleEdit(blog.blogId, blog.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(blog.blogId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
