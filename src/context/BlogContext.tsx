import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Blog, BlogContextType } from "../types/blog.types";
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
                        if(post.email === decoded.email){
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





    return (
        <BlogContext.Provider value={{ allBlog, blog, userBlog }}>
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


