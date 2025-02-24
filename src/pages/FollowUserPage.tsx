
import { useBlog } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import BlogProp from "../components/BlogArticleProp";
import { Blog } from "../types/blog.types"

// Sida/komponent som skriver ut en följd användares alla inlägg
const PersonalPage = () => {

    // läser in alla inlägg från BlogContext och email från parabeter
    const { email } = useParams();
    const { blog } = useBlog();

    // returneras om inläggen inte kan laddas in
    if (!blog) {
        return <>
            <h1 className="title">Följ Flow</h1>
            <p><b>Bloggdata laddas in...</b></p>;
        </>
    }

    //Returnerar alla inlägg i flödet för en följd användare
    return (
        <>
            <div className="container mt-5">
                <h2 className="title">Följ Flow</h2>
                {blog
                    .filter(item => item.email === email) // Filtrera inläggen baserat på followEmail
                    .map((blog: Blog) => <BlogProp blog={blog} key={blog.id} />)}
            </div>
        </>
    )
}

export default PersonalPage
