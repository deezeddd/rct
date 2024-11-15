import React, { useState } from 'react'

export default function AddBlog({setBlogs, fetchBlogs}) {
  const [text,setText] = useState(null);

  async function handleBlog(){
    if(text !== null && text?.length > 0){
      console.log(text.length);
     const response = await fetch("http://localhost:8080/", {
       method: "POST",
       body: JSON.stringify({ text }),
       headers: {
         "Content-Type": "application/json",
       },
     });
     setText('');
     if(response.ok){
       console.log("Blog added successfully");
      fetchBlogs();
     }
     else{
      console.error("Failed to add blog");
     }
    }
    else{
      console.log("Blog can't be empty");
    }
  }
  function handleChange(e){
    setText(e.target.value);
  }

  return (
    <div>
      <div className="p-3">
        <input className="border-2 p-1" value={text} onChange={(e) => handleChange(e)} />
        <button
          className="ml-3 text-green-400 hover:underline"
          onClick={handleBlog}
        >
          Add
        </button>
      </div>
    </div>
  );
}
