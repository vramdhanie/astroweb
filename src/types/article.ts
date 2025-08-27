export interface Article {
    title: string
    _slug: string
    image: string
    date: string
    author: string
    level: string
    tags: string[]
    abstract: string
    content: string
}

export interface ArticleMeta {
    title: string
    _slug: string
    image: string
    date: string
    author: string
    level: string
    tags: string[]
    abstract: string
}

export interface ArticleListItem {
    title: string
    _slug: string
    image: string
    date: string
    author: string
    level: string
    tags: string[]
    abstract: string
    readingTime?: number
}
