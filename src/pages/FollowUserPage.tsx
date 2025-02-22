
import { useEffect } from "react"
import { useBlog } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import BlogProp from "../components/BlogArticleProp";
import { Blog } from "../types/blog.types"

const PersonalPage = () => {


    const { email } = useParams();
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

    return (
        <>
            <div className="container mt-5">
                <h2 className="title">Flow</h2>
                {blog
                    .filter(item => item.email === email) // Filtrera inläggen baserat på followEmail
                    .map((blog: Blog) => <BlogProp blog={blog} key={blog.id} />)}
            </div>
        </>
    )
}

export default PersonalPage
