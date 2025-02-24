
import { useEffect } from "react"
import { useBlog } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import BlogProp from "../components/BlogArticleProp";
import { Blog } from "../types/blog.types"

const SinglePage = () => {


  const { id } = useParams();
  let intId: number;
  if (id) {
    intId = parseInt(id);
  }

  const { blog, allBlog } = useBlog();

  /*
  useEffect(() => {
    allBlog();
  }, []);
*/

  if (!blog) {

    return <>
      <h1 className="title">Ett Flow</h1>
      <p><b>Bloggdata kunde inte laddas...</b></p>;
    </>
  }

  // Hitta det första objektet med matchande id
  const item: Blog | undefined = blog.find(item => item.id === intId);

  if (!item) {
    return (
      <>
        <h1 className="title">Ett Flow</h1>
        <p><b>Det finns inget inlägg med det angivna ID:t.</b></p>
      </>
    );
  }

  return (
    <>

      <div className="container mt-5">
        <h2 className="title">Ett Flow</h2>
        {item && <BlogProp blog={item} key={item.id} />}
      </div>

    </>

  )
}

export default SinglePage
