export interface Blog {
    id: number,
    heading: string,
    date: Date,
    about: string,
    email: string,
    name: string
}

export interface PostBlog {
    heading: string,
    about: string,
}

export interface BlogContextType {
    blog: Blog[] | null,
    allBlog: () => void,    
    postBlog: (blog: PostBlog) => void,
    putBlog: (blog: PostBlog, id: number) => void,
    userBlog: Blog[] | null
}

