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
          <h3 className="card-header-title">{blog.heading}</h3>
        </div>
        <div className="card-content">
          <p className="content">
            {blog.about}
          </p>
          <NavLink to={"/follow/" + blog.email} className="mr-5">@{blog.name}#All</NavLink>
          <NavLink to={"/single/" + blog.id} className="mr-5">@{blog.name}#{blog.id}</NavLink>
          <b><time className="is-size-7 is-pulled-right">{new Date(blog.date).toLocaleDateString()}</time></b>
        </div>
      </article>

    </>

  )
}

export default BlogProp