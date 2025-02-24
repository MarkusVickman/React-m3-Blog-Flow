//Interface för blogginlägg som ska skivas ut
export interface Blog {
    id: number,
    heading: string,
    date: Date,
    about: string,
    email: string,
    name: string
}

//Interface för att posta och ändra inlägg
export interface PostBlog {
    heading: string,
    about: string,
}

//Interface för att dela blogContext med dess metoder och interfaces till sidor och komponenter
export interface BlogContextType {
    blog: Blog[] | null,
    allBlog: () => void,    
    postBlog: (blog: PostBlog) => void,
    putBlog: (blog: PostBlog, id: number) => void,
    deleteBlog: (id: number) => void,
    userBlog: Blog[] | null
}

