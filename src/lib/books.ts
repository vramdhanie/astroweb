import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ReadingStatus = 'READ' | 'READING' | 'WAIT' | ''

export interface Book {
    isbn: string
    title: string
    author: string
    year: string
    cover: string
    description: string
    yearRead: string
    readingStatus: ReadingStatus
    pagesRead: number
    pageCount: number
    progressPercentage: string
}

export interface BookYear {
    year: string
    _slug: string
    title: string
    cover: string
    description: string
}

export interface BookYearWithBooks extends BookYear {
    books: Book[]
}

// Get all book years from content files
export function getAllBookYears(): BookYear[] {
    const booksDirectory = path.join(process.cwd(), 'src/content/books')

    if (!fs.existsSync(booksDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(booksDirectory)
    const years = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const filePath = path.join(booksDirectory, fileName)
            const fileContents = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(fileContents)

            return {
                year: data.year,
                _slug: data._slug,
                title: data.title,
                cover: data.cover,
                description: data.description,
            }
        })
        .sort((a, b) => b.year.localeCompare(a.year)) // Sort years descending

    return years
}

// Get books for a specific year
export function getBooksForYear(year: string): Book[] {
    const booksDataPath = path.join(process.cwd(), 'src/data/books.json')
    const booksData = JSON.parse(fs.readFileSync(booksDataPath, 'utf8'))

    if (year === '2026') {
        // For 2026: include all books with yearRead === '2026' (any status), plus books without a yearRead
        return booksData.filter((book: Book) => {
            const hasNoYearRead = !book.yearRead || book.yearRead === ''
            const isIn2026 = book.yearRead === '2026'
            return isIn2026 || hasNoYearRead
        })
    } else {
        // For other years: include all books with that yearRead (any status)
        return booksData.filter((book: Book) => book.yearRead === year)
    }
}

// Get a specific book year with its books
export function getBookYearBySlug(slug: string): BookYearWithBooks | null {
    const years = getAllBookYears()
    const year = years.find((y) => y._slug === slug)

    if (!year) {
        return null
    }

    const books = getBooksForYear(year.year)

    return {
        ...year,
        books,
    }
}

// Get all book slugs for static generation
export function getAllBookYearSlugs(): string[] {
    const years = getAllBookYears()
    return years.map((year) => year._slug)
}
