import AddBlog from './components/AddBlog.js';
import './App.css';
import Blog from './components/Blog.js';
import {useEffect, useState} from 'react';
function App() {
  const [blogs, setBlogs] = useState([]);
  // The Blog array will be here
        const fetchBlogs = async () => {
          const response = await fetch("http://localhost:8080/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data);
          setBlogs(data);
        };


    useEffect(() => {
      fetchBlogs();
    }, []); 

  return (
    <div className="p-6 text-xl">
      <h1> Blog App </h1>
      <div className="p-3">
        {/* Component Add Blog */}
        <AddBlog setBlogs={setBlogs} fetchBlogs = {fetchBlogs} />
        {/* Component blog // Display */}
        <Blog blogs={blogs} setBlogs={setBlogs} />
      </div>
    </div>
  );
}

export default App;
// [] add
// text -> edit and delete
// Input box, add button, edit button, delete
// after adding the blog it should be displayed
