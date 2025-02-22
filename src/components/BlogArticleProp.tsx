import { Blog } from "../types/blog.types"
import { NavLink } from 'react-router-dom';

//Interface för propsen som komponenten tar emot
interface BlogProps {
    blog: Blog;
   // editPost: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

//Child som tar emot props enligt interface Todo
const BlogProp: React.FC<BlogProps> = ({ blog }) => {

  return (
    <>

          <article className="card" key={blog.id}>
            <div className="card-header">
              <p className="card-header-title">{blog.heading}</p>
            </div>
            <div className="card-content">
              <p className="content">
                {blog.about}
                </p>
                <NavLink to={"/follow/" + blog.email} className="mr-5">@{blog.name}#All</NavLink>
                <NavLink to={"/single/" + blog.id} className="mr-5">@{blog.name}#{blog.id}</NavLink>
                <time className="is-size-7 is-pulled-right"><b>{new Date(blog.date).toLocaleDateString()}</b></time>
            </div>
          </article>

    </>

  )
}

export default BlogProp