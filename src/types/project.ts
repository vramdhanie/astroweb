export interface Project {
    title: string
    slug: string
    description: string
    abstract: string
    githubUrl: string
    liveUrl?: string
    icon?: string
    techStack: string[]
    highlight: boolean
    featured: boolean
    date: string
    tags: string[]
    priority?: number
    playground?: boolean
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
    icon?: string
    techStack: string[]
    highlight: boolean
    featured: boolean
    date: string
    tags: string[]
    priority?: number
    playground?: boolean
    stars?: number
    forks?: number
    language?: string
}
