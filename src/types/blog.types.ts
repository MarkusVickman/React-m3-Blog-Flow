export interface Blog {
    id: number,
    heading: string,
    date: Date,
    about: string,
    email: string,
    name: string
}

export interface BlogContextType {
    blog: Blog[] | null,
    allBlog: () => void,
    userBlog: Blog[] | null
}

