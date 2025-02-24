import { useBlog } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import BlogProp from "../components/BlogArticleProp";
import { Blog } from "../types/blog.types"

// Sida/komponent för enstaka inlägg 
const SinglePage = () => {

  // Läser in html-parameter
  const { id } = useParams();
  let intId: number;

  //parameter läses in till intId
  if (id) {
    intId = parseInt(id);
  }

  //Hämtar alla inlägg
  const { blog } = useBlog();

  //Om inläggen inte hunnits ladda eller inte kan ladda.
  if (!blog) {
    return <>
      <h1 className="title">Ett Flow</h1>
      <p><b>Bloggdata kunde inte laddas...</b></p>;
    </>
  }

  // Hitta det första objektet med matchande id
  const item: Blog | undefined = blog.find(item => item.id === intId);

  //Om id är felaktigt eller inte hittas
  if (!item) {
    return (
      <>
        <h1 className="title">Ett Flow</h1>
        <p><b>Det finns inget inlägg med det angivna ID:t.</b></p>
      </>
    );
  }

  //Returnerar ett inlägg
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
