import { createContext, useState, useContext, ReactNode } from "react";
import { Blog, PostBlog, BlogContextType } from "../types/blog.types";
import { User } from "../types/auth.types";
import { jwtDecode } from 'jwt-decode';

const BlogContext = createContext<BlogContextType | null>(null);

export interface BlogProviderProps {
    children: ReactNode
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {

    const [blog, setBlog] = useState<Blog[] | null>(null);
    const [userBlog, setUserBlog] = useState<Blog[] | null>(null);

    const allBlog = async () => {

        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/blog/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                const data = await res.json() as Blog[];

                if (localStorage.getItem("trespasser")) {
                    const token = JSON.stringify(localStorage.getItem("trespasser"));
                    const decoded: User = jwtDecode(token);

                    let tempUserPost: Blog[] = [];

                    data.forEach(post => {
                        if (post.email === decoded.email) {
                            tempUserPost.push(post);
                        }
                    });

                    setUserBlog(tempUserPost);

                }

                setBlog(data);
            }

        } catch (error) {
            throw error;
        }
    }


    const postBlog = async (blog: PostBlog) => {
        const token = localStorage.getItem("trespasser");

        if (!token) {
            return;
        }
        try {
            const res = await fetch("https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/blog/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(blog)
            })

            if (res.ok) {
                allBlog();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    const putBlog = async (blog: PostBlog, id: number) => {
        const token = localStorage.getItem("trespasser");

        if (!token) {
            return;
        }
        try {
            const res = await fetch(`https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/blog/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(blog)
            })

            if (res.ok) {
                allBlog();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    const deleteBlog = async (id: number) => {
        const token = localStorage.getItem("trespasser");

        if (!token) {
            return;
        }
        try {
            const res = await fetch(`https://react-m3-backend-nest-js-1050979898493.us-central1.run.app/blog/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.ok) {
                allBlog();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }



    return (
        <BlogContext.Provider value={{ allBlog, blog, userBlog, postBlog, putBlog, deleteBlog }}>
            {children}
        </BlogContext.Provider>

    )

}


export const useBlog = (): BlogContextType => {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error("useBlog måste användas inom en BlogProvider")
    }

    return context;
}


