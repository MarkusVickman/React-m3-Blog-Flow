
import { useEffect } from "react"
import { useBlog } from "../context/BlogContext";
import { Blog } from "../types/blog.types"
import BlogProp from "../components/BlogArticleProp";

const HomePage = () => {

  // läser in funktioner och data från BlogContext
  const { blog, allBlog } = useBlog();

  // Läser in alla inlägg
  useEffect(() => {
    allBlog();
  }, []);

  // returneras om inläggen inte kan laddas in
  if (!blog) {
    return <>
      <h1 className="title">Flow</h1>
      <p><b>Bloggdata laddas in...</b></p>;
    </>
  }

  //Returnerar alla inlägg i flödet
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