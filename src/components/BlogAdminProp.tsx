import { Blog } from "../types/blog.types"

//Interface för propsen som komponenten tar emot
interface BlogProps {
  blog: Blog;
  fillForm: (blog: Blog) => void;
  submitDelete: (id: number) => void
};

//Child som tar emot props enligt interface BlogProps samt Blog och metoder
const AdminProp: React.FC<BlogProps> = ({ blog, fillForm, submitDelete }) => {

//Returnerar styling och struktur för blogginlägg som visas på PersonalPage med redigeringsmöjligheter
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
        <b><time className="is-size-7 is-pulled-right">{new Date(blog.date).toLocaleDateString()}</time></b>
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