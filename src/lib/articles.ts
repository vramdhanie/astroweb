import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Article, ArticleListItem } from '../types/article'

const articlesDirectory = path.join(process.cwd(), 'src/content/articles')

// Calculate reading time based on content length
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
}

// Get all article slugs
export function getAllArticleSlugs(): string[] {
    try {
        const fileNames = fs.readdirSync(articlesDirectory)
        return fileNames
            .filter((fileName) => fileName.endsWith('.mdx'))
            .map((fileName) => fileName.replace(/\.mdx$/, ''))
    } catch (error) {
        console.error('Error reading articles directory:', error)
        return []
    }
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | null {
    try {
        const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Validate required fields
        const requiredFields = [
            'title',
            '_slug',
            'image',
            'date',
            'author',
            'level',
            'tags',
            'abstract',
        ]
        for (const field of requiredFields) {
            if (!data[field]) {
                console.warn(`Missing required field '${field}' in article ${slug}`)
                return null
            }
        }

        return {
            title: data.title,
            _slug: data._slug,
            image: data.image,
            date: data.date,
            author: data.author,
            level: data.level,
            tags: Array.isArray(data.tags) ? data.tags : [data.tags],
            abstract: data.abstract,
            content,
        }
    } catch (error) {
        console.error(`Error reading article ${slug}:`, error)
        return null
    }
}

// Get all articles with metadata
export function getAllArticles(): ArticleListItem[] {
    try {
        const slugs = getAllArticleSlugs()
        const articles = slugs
            .map((slug) => getArticleBySlug(slug))
            .filter((article): article is Article => article !== null)
            .map((article) => ({
                title: article.title,
                _slug: article._slug,
                image: article.image,
                date: article.date,
                author: article.author,
                level: article.level,
                tags: article.tags,
                abstract: article.abstract,
                readingTime: calculateReadingTime(article.content),
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        return articles
    } catch (error) {
        console.error('Error getting all articles:', error)
        return []
    }
}

// Get articles by tag
export function getArticlesByTag(tag: string): ArticleListItem[] {
    const articles = getAllArticles()
    return articles.filter((article) =>
        article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    )
}

// Get articles by level
export function getArticlesByLevel(level: string): ArticleListItem[] {
    const articles = getAllArticles()
    return articles.filter((article) => article.level.toLowerCase() === level.toLowerCase())
}

// Get all unique tags
export function getAllTags(): string[] {
    const articles = getAllArticles()
    const tags = new Set<string>()

    articles.forEach((article) => {
        article.tags.forEach((tag) => tags.add(tag))
    })

    return Array.from(tags).sort()
}

// Get all unique levels
export function getAllLevels(): string[] {
    const articles = getAllArticles()
    const levels = new Set<string>()

    articles.forEach((article) => {
        levels.add(article.level)
    })

    return Array.from(levels).sort()
}
