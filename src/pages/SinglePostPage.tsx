
import { useEffect } from "react"
import { useBlog } from "../context/BlogContext";
import { useParams } from "react-router-dom";

const SinglePage = () => {


  const { id } = useParams();
  let intId: number;
  if (id) {
    intId = parseInt(id);
  }

  const { blog, allBlog } = useBlog();

  useEffect(() => {
    allBlog();
  }, []);


  if (!blog) {

    return <>
      <h1 className="title">Följ Flow</h1>
      <p><b>Bloggdata kunde inte laddas...</b></p>;
    </>
  }

  // Hitta det första objektet med matchande id
  const item = blog.find(item => item.id === intId);

  if (!item) {
    return (
      <>
        <h1 className="title">Inlägg inte hittat</h1>
        <p><b>Det finns inget inlägg med det angivna ID:t.</b></p>
      </>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <h2 className="title">Flow</h2>        
            <article className="card" key={item.id}>
              <div className="card-header">
                <p className="card-header-title">{item.heading}</p>
              </div>
              <div className="card-content">
                <p className="content">
                  {item.about}
                </p>
                <time className="is-size-7 is-pulled-right"><b>{new Date(item.date).toLocaleDateString()}</b></time>
              </div>
            </article>
      </div>

    </>

  )
}

export default SinglePage
