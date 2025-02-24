import { createContext, useState, useContext, ReactNode } from "react";
import { Blog, PostBlog, BlogContextType } from "../types/blog.types";
import { User } from "../types/auth.types";
import { jwtDecode } from 'jwt-decode';

// Initierar BlogContext
const BlogContext = createContext<BlogContextType | null>(null);

// Interface för blogprovider
export interface BlogProviderProps {
    children: ReactNode
}

// exporterar en komponent med namnet BlogProvider
export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {

    // initierar blog samt userBlog
    const [blog, setBlog] = useState<Blog[] | null>(null);
    const [userBlog, setUserBlog] = useState<Blog[] | null>(null);

    //Api GET som hämtar in alla inlägg
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

                // Läser in och avkodar jwt om finns
                if (localStorage.getItem("trespasser")) {
                    const token = JSON.stringify(localStorage.getItem("trespasser"));
                    const decoded: User = jwtDecode(token);

                    let tempUserPost: Blog[] = [];

                    //Filtrerar och lagrar aktiva användarens inlägg i en egen array 
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

    //Skickar POST med ett nytt blogginlägg, kräver ok bearer 
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

            // Vid ok respons uppdateras bloggdata
            if (res.ok) {
                allBlog();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    //Skickar PUT med ett uppdaterat blogginlägg, kräver ok bearer samt id 
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

            // Vid ok respons uppdateras bloggdata
            if (res.ok) {
                allBlog();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    //Tar bort ett inlägg med angivet id
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

            // Vid ok respons uppdateras bloggdata
            if (res.ok) {
                allBlog();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    //Returnerar Context med funktioner samt data
    return (
        <BlogContext.Provider value={{ allBlog, blog, userBlog, postBlog, putBlog, deleteBlog }}>
            {children}
        </BlogContext.Provider>
    )
}

//Exporterar Context
export const useBlog = (): BlogContextType => {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error("useBlog måste användas inom en BlogProvider")
    }

    return context;
}


