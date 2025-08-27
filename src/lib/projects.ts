import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project, ProjectListItem } from '@/types/project'

// Get all projects from content files
export function getAllProjects(): ProjectListItem[] {
    const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

    if (!fs.existsSync(projectsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const projects = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const filePath = path.join(projectsDirectory, fileName)
            const fileContents = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(fileContents)

            return {
                title: data.title,
                slug: data.slug,
                description: data.description,
                abstract: data.abstract,
                githubUrl: data.githubUrl,
                liveUrl: data.liveUrl,
                techStack: data.techStack || [],
                highlight: data.highlight || false,
                featured: data.featured || false,
                date: data.date,
                tags: data.tags || [],
                stars: data.stars,
                forks: data.forks,
                language: data.language,
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return projects
}

// Get highlighted projects for home page
export function getHighlightedProjects(): ProjectListItem[] {
    const allProjects = getAllProjects()
    return allProjects.filter((project) => project.highlight)
}

// Get featured projects
export function getFeaturedProjects(): ProjectListItem[] {
    const allProjects = getAllProjects()
    return allProjects.filter((project) => project.featured)
}

// Get a specific project by slug
export function getProjectBySlug(slug: string): Project | null {
    const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

    if (!fs.existsSync(projectsDirectory)) {
        return null
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const projectFile = fileNames.find((fileName) => fileName.replace('.mdx', '') === slug)

    if (!projectFile) {
        return null
    }

    const filePath = path.join(projectsDirectory, projectFile)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        title: data.title,
        slug: data.slug,
        description: data.description,
        abstract: data.abstract,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        techStack: data.techStack || [],
        highlight: data.highlight || false,
        featured: data.featured || false,
        date: data.date,
        tags: data.tags || [],
        readme: content,
        stars: data.stars,
        forks: data.forks,
        language: data.language,
    }
}

// Get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
    const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

    if (!fs.existsSync(projectsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace('.mdx', ''))
}

// Get projects by tag
export function getProjectsByTag(tag: string): ProjectListItem[] {
    const allProjects = getAllProjects()
    return allProjects.filter((project) =>
        project.tags.some((projectTag) => projectTag.toLowerCase() === tag.toLowerCase())
    )
}

// Get all unique tags
export function getAllProjectTags(): string[] {
    const allProjects = getAllProjects()
    const allTags = allProjects.flatMap((project) => project.tags)
    return [...new Set(allTags)].sort()
}
