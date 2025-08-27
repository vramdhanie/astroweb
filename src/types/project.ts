export interface Project {
    title: string
    slug: string
    description: string
    abstract: string
    githubUrl: string
    liveUrl?: string
    techStack: string[]
    highlight: boolean
    featured: boolean
    date: string
    tags: string[]
    readme: string
    stars?: number
    forks?: number
    language?: string
}

export interface ProjectListItem {
    title: string
    slug: string
    description: string
    abstract: string
    githubUrl: string
    liveUrl?: string
    techStack: string[]
    highlight: boolean
    featured: boolean
    date: string
    tags: string[]
    stars?: number
    forks?: number
    language?: string
}
