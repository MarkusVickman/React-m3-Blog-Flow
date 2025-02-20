
import React, { useEffect, useState } from "react"
import './css/LoginPage.css'
import { useBlog } from "../context/BlogContext";
import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../types/blog.types"
import { NavLink } from 'react-router-dom';


const HomePage = () => {

  const navigate = useNavigate();
  const { blog, allBlog } = useBlog();


  useEffect(() => {
    allBlog();
  }, []);


  if (!blog) {

    return <>
      <h1 className="title">Flow</h1>
      <p><b>Bloggdata kunde inte laddas...</b></p>;
    </>
  }

  return (
    <>
      <section className="container">
        <h1 className="title ">The Flow</h1>

        {blog.map((item: Blog) => (
          <article className="card"  key={item.id}>
            <div className="card-header">
              <p className="card-header-title">{item.heading}</p>
            </div>
            <div className="card-content">
              <p className="content">
                {item.about}
                </p>
                <NavLink to={"/follow/" + item.email} className="mr-5">@{item.name}#All</NavLink>
                <NavLink to={"/single/" + item.id} className="mr-5">@{item.name}#{item.id}</NavLink>
                <time className="is-size-7 is-pulled-right"><b>{new Date(item.date).toLocaleDateString()}</b></time>
            </div>
          </article>
        ))}
      </section>

    </>

  )
}

export default HomePage