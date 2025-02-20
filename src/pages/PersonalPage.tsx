
import React, { useEffect, useState } from "react"
import './css/LoginPage.css'
import { useBlog } from "../context/BlogContext";
import { Blog } from "../types/blog.types"


const PersonalPage = () => {

  const { userBlog, allBlog } = useBlog();
      const [newHeading, setNewHeading] = useState('');
      const [newAbout, setNewAbout] = useState('');
     // const [error, setError] = useState('');
      const [date, setDate] = useState(new Date().toLocaleDateString());

      //const thisDate = new Date().toLocaleDateString();
      //setDate(thisDate);


  useEffect(() => {
    allBlog();
  }, []);


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

        <h2 className="title mt-5">Nytt inlägg</h2>
        <form className="card">

          <div className="card-header">
          <input className="card-header-title input" type="text" id="newheading" placeholder="Titel.." required value={newHeading} onChange={(e) => setNewHeading(e.target.value)} />
          </div>

          <div className="card-content">
          <input className="input" type="text" id="newabout" placeholder="Skriv här.." required value={newAbout} onChange={(e) => setNewAbout(e.target.value)} />
          <time className="is-size-7 is-pulled-right"><b>{date}</b></time>
          </div>
          
          <div className="card-footer">
          <button className="card-footer-item has-text-weight-bold" type="submit">
            Spara
          </button>
          </div>
        </form>
      </div>

      <div className="container mt-5">
        <h2 className="title">Ditt Flow</h2>
        {userBlog.map((item: Blog) => (
          <article className="card"  key={item.id}>
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
              <a href="#" className="card-footer-item">Redigera</a>
              <a href="#" className="card-footer-item">Ta bort</a>
            </div>
          </article>
        ))}
      </div>

    </>

  )
}

export default PersonalPage
