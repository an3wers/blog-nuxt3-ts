export interface IPost {
    id: string,
    content: string,
    descr: string,
    imgUrl: string,
    title: string,
}

export interface IPostAdd {
    content: string,
    descr: string,
    imgUrl: string,
    title: string,
}

export interface IPostUpdate {
    content: string,
    descr: string,
    imgUrl: string,
    title: string,
    id?: string
}