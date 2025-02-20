
import React, { useEffect, useState } from "react"
import './css/LoginPage.css'
import { useBlog } from "../context/BlogContext";
import { Blog } from "../types/blog.types"
import { useParams } from "react-router-dom";

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
                    .map(item => (
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
                        </article>            

        ))}
            </div>

        </>

    )
}

export default PersonalPage
