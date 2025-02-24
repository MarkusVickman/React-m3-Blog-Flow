
import React, { useEffect, useState } from "react"
import { useBlog } from "../context/BlogContext";
import { Blog, PostBlog } from "../types/blog.types"
import { useAuth } from "../context/AuthContext";
import AdminProp from "../components/BlogAdminProp";

const PersonalPage = () => {

  /*
  -läser in funktioner och data från BlogContext
  -formulärdata
  */
  const { userBlog, allBlog, blog, postBlog, putBlog, deleteBlog } = useBlog();
  const { user } = useAuth();
  const [newHeading, setNewHeading] = useState('');
  const [newAbout, setNewAbout] = useState('');

  // Formulärhantering
  const [formHeader, setFormHeader] = useState('Nytt inlägg');
  const [id, setId] = useState<number | null>(null);
  const date = (new Date().toLocaleDateString());
  const [error, setError] = useState('');

  //Läser in alla inlägg
  useEffect(() => {
    allBlog();
  }, []);

  //Resettar komponenten när bloginläggen uppdateras
  useEffect(() => {
    setNewAbout('');
    setNewHeading('');
    setId(null);
    setFormHeader("Nytt inlägg");
  }, [blog]);

  //Vid submit testas inmatning sen skickas det nya inlägget
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkInput()) {
      const newPost: PostBlog = {
        heading: newHeading,
        about: newAbout
      }
      postBlog(newPost);
    }
  }

  //Vid put-submit testas inmatning sen skickas inlägget
  const submitPut = async () => {

    if (checkInput()) {
      const newPost: PostBlog = {
        heading: newHeading,
        about: newAbout
      }
      if (id !== null) {
        putBlog(newPost, id);
      }
    }
  }

  //Vid delete tas inlägget bort
  const submitDelete = async (id: number) => {
    if (id !== null) {
      deleteBlog(id);
    }
  }

  //Om en uppdatering avbryts återställs formuläret
  const cancelPut = () => {
    setNewAbout('');
    setNewHeading('');
    setId(null);
    setFormHeader("Nytt inlägg");
  }

  //Fyller i formuläret med blog-objektet
  const fillForm = (blog: Blog) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNewAbout(blog.about);
    setNewHeading(blog.heading);
    setId(blog.id);
    setFormHeader("Redigera inlägg: " + blog.id);
  }


  //Metod som kontrollerar inmatningar och returnerar true om korrekt inmatat.
  const checkInput = () => {
    let validationErrors: boolean = true;
    let errorString = "";

    if (newHeading.length < 1) {
      validationErrors = false;

      errorString = "Inlägget måste ha en titel. ";
    }

    if (newAbout.length < 5) {
      validationErrors = false;

      errorString = errorString + "Inlägget måste vara minst 5 tecken långt. ";

    }

    if (validationErrors) {
      setError("");
      return true
    } else {
      setError(errorString);
      return false
    }
  }

  // returneras om inläggen inte kan laddas in
  if (!blog || !userBlog) {

    return (<>
      <h1 className="title">Flow</h1>
      <p><b>Laddar Flow data...</b></p>;
    </>)
  }

  /* Ett formulär som kan posta nya inlägg eller redigera gamla. Knappar samt text ändras dynamiskt */
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
            <b><time className="is-size-7 is-pulled-right">{date}</time></b>
          </div>

          <div className="card-footer">
            {!id ? (
              <button className="card-footer-item has-text-weight-bold" type="submit">
                Spara
              </button>
            ) :
              <>
                <button className="card-footer-item has-text-weight-bold" onClick={submitPut}>
                  Ändra
                </button>
                <button className="card-footer-item has-text-weight-bold" onClick={cancelPut}>
                  Avbryt
                </button>
              </>
            }
          </div>
          {error && (
            <div>
              {error}
            </div>
          )}
        </form>
      </div>

      {/* skriver ut aktiva användarens flöde */}
      <div className="container mt-5">
        <h2 className="title">Ditt Flow</h2>
        {userBlog.map((blog: Blog) => (<AdminProp blog={blog} key={blog.id} submitDelete={submitDelete} fillForm={fillForm} />))}
      </div>

      {/* Om aktiva användaren är en admin så skrivs alla inlägg ut som också går att redigera samt ta bort */}
      {user && user.isAdmin ? (
        <div className="container mt-5">
          <h2 className="title">Admin Flow</h2>
          {blog.map((blog: Blog) => (<AdminProp blog={blog} key={blog.id} submitDelete={submitDelete} fillForm={fillForm} />))}
        </div>
      ) : null}
    </>
  )
}

export default PersonalPage
