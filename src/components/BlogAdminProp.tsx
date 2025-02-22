import { Blog } from "../types/blog.types"

//Interface för propsen som komponenten tar emot
interface BlogProps {
    blog: Blog;
    fillForm: (blog: Blog) => void;
    submitDelete: (id: number) => void
};

//Child som tar emot props enligt interface Todo
const AdminProp: React.FC<BlogProps> = ({ blog, fillForm, submitDelete }) => {

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
              <time className="is-size-7 is-pulled-right"><b>{new Date(blog.date).toLocaleDateString()}</b></time>
            </div>

            <div className="card-footer">
              <button className="card-footer-item" onClick={() => fillForm(blog)}>Redigera</button>
              <button className="card-footer-item" onClick={() => submitDelete(blog.id)}>Ta bort</button>
            </div>
          </article>

    </>

  )
}

export default AdminProp