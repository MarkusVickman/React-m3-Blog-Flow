
import React, { useEffect, useState } from "react"
import { useBlog } from "../context/BlogContext";
import { Blog, PostBlog } from "../types/blog.types"
import { useAuth } from "../context/AuthContext";

const PersonalPage = () => {

  const { userBlog, allBlog, blog, postBlog, putBlog, deleteBlog } = useBlog();
  const { user } = useAuth();
  const [newHeading, setNewHeading] = useState('');
  const [newAbout, setNewAbout] = useState('');
  const [formHeader, setFormHeader] = useState('Nytt inlägg');
  const [id, setId] = useState<number | null>(null);
  const date = (new Date().toLocaleDateString());


  useEffect(() => {
    allBlog();
  }, []);

  useEffect(() => {
    setNewAbout('');
    setNewHeading('');
    setId(null);
    setFormHeader("Nytt inlägg");
  }, [blog]);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: PostBlog = {
      heading: newHeading,
      about: newAbout
    }
    postBlog(newPost);
  }

  const submitPut = async () => {
    const newPost: PostBlog = {
      heading: newHeading,
      about: newAbout
    }
    if (id !== null) {
      putBlog(newPost, id);
    }
  }

  const submitDelete = async (id: number) => {
    if (id !== null) {
      deleteBlog(id);
    }
  }

  const fillForm = (blog: Blog) => {

    setNewAbout(blog.about);
    setNewHeading(blog.heading);
    setId(blog.id);
    setFormHeader("Redigera inlägg: " + blog.id);

  }

  if (!userBlog) {

    return <>
      <h1 className="title">Hantera ditt Flow</h1>
      <p><b>Bloggdata kunde inte laddas...</b></p>;
    </>
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="title ">Hantera ditt Flow</h1>

        <h2 className="title mt-5">{formHeader}</h2>
        <form className="card" onSubmit={submitPost}>

          <div className="card-header">
            <input className="card-header-title input" type="text" id="newheading" placeholder="Titel.." required value={newHeading} onChange={(e) => setNewHeading(e.target.value)} />
          </div>

          <div className="card-content">
            <input className="input" type="text" id="newabout" placeholder="Skriv här.." required value={newAbout} onChange={(e) => setNewAbout(e.target.value)} />
            <time className="is-size-7 is-pulled-right"><b>{date}</b></time>
          </div>

          <div className="card-footer">
            {!id ? (
              <button className="card-footer-item has-text-weight-bold" type="submit">
                Spara
              </button>
            ) :
              <button className="card-footer-item has-text-weight-bold" onClick={submitPut}>
                Ändra
              </button>
            }
          </div>
        </form>
      </div>

      <div className="container mt-5">
        <h2 className="title">Ditt Flow</h2>
        {userBlog.map((item: Blog) => (
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

            <div className="card-footer">
              <button className="card-footer-item" onClick={() => fillForm(item)}>Redigera</button>
              <button className="card-footer-item" onClick={() => submitDelete(item.id)}>Ta bort</button>
            </div>
          </article>
        ))}
      </div>

      {user && user.isAdmin ? (
        <div className="container mt-5">
          <h2 className="title">Admin Flow</h2>
          {blog!.map((item: Blog) => (
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

              <div className="card-footer">
                <button className="card-footer-item" onClick={() => fillForm(item)}>Redigera</button>
                <button className="card-footer-item" onClick={() => submitDelete(item.id)}>Ta bort</button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </>

  )
}

export default PersonalPage
