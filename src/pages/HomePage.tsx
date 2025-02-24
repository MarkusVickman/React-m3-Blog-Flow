
import { useEffect } from "react"
import { useBlog } from "../context/BlogContext";
import { Blog } from "../types/blog.types"
import BlogProp from "../components/BlogArticleProp";

const HomePage = () => {

  const { blog, allBlog } = useBlog();


  useEffect(() => {
    allBlog();
  }, []);


  if (!blog) {

    return <>
      <h1 className="title">Flow</h1>
      <p><b>Bloggdata laddas in...</b></p>;
    </>
  }

  return (
    <>
      <section className="container">
        <h1 className="title ">The Flow</h1>

        {blog.map((blog: Blog) => <BlogProp blog={blog} key={blog.id} />)}

      </section>

    </>

  )
}

export default HomePage