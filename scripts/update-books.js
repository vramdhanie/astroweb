#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSV_PATH = path.join(__dirname, '..', 'bookshelf.csv');
const BOOKS_CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'books');
const INDEX_PATH = path.join(__dirname, '..', 'src', 'pages', 'index.astro');
const CURRENT_YEAR = new Date().getFullYear();

// Google Books API base URL
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

// Book status mapping
const BOOK_STATUS = {
  READ: 'check',
  READING: 'reading', 
  WAIT: 'wait'
};

// Icon colors
const ICON_COLORS = {
  [BOOK_STATUS.READ]: 'text-green-400',
  [BOOK_STATUS.READING]: 'text-orange-400',
  [BOOK_STATUS.WAIT]: 'text-yellow-400'
};

/**
 * Fetch book details from Google Books API
 */
async function fetchBookDetails(isbn) {
  if (!isbn || isbn.trim() === '') {
    return null;
  }
  
  try {
    console.log(`Fetching book details for ISBN: ${isbn}`);
    // Use node-fetch or built-in fetch (Node 18+)
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=isbn:${isbn.trim()}`);
    if (!response.ok) {
      console.warn(`Failed to fetch book details for ISBN ${isbn}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      console.log(`Found book: ${book.title} by ${book.authors?.join(', ') || 'Unknown'}`);
      return {
        title: book.title,
        authors: book.authors || [],
        publishedDate: book.publishedDate,
        description: book.description,
        imageLinks: book.imageLinks,
        pageCount: book.pageCount
      };
    } else {
      console.log(`No book found for ISBN: ${isbn}`);
    }
  } catch (error) {
    console.warn(`Error fetching book details for ISBN ${isbn}:`, error.message);
  }
  return null;
}

/**
 * Determine book status based on CSV data
 */
function getBookStatus(book) {
  if (book.Read === '1') {
    return BOOK_STATUS.READ;
  }
  
  const pagesRead = parseInt(book['Pages Read'] || '0');
  const totalPages = parseInt(book['Page Count'] || '0');
  
  if (pagesRead > 0 && totalPages > 0) {
    return BOOK_STATUS.READING;
  }
  
  return BOOK_STATUS.WAIT;
}

/**
 * Generate cover filename from book title
 */
function generateCoverFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 30) + '.jpg';
}

/**
 * Generate MDX content for a book
 */
function generateBookMDX(book, status, googleData = null) {
  const title = googleData?.title || book.Title;
  const authors = googleData?.authors?.join(', ') || book.Authors;
  const year = googleData?.publishedDate?.substring(0, 4) || book['Published At']?.substring(0, 4) || '';
  const description = googleData?.description || book.Description || '';
  const isbn = book.ISBN || '';
  
  let coverFilename = '';
  if (googleData?.imageLinks?.thumbnail) {
    // Use Google Books cover if available
    coverFilename = googleData.imageLinks.thumbnail;
  } else {
    // Generate local filename
    coverFilename = generateCoverFilename(title);
  }
  
  const iconName = status;
  const iconColor = ICON_COLORS[status];
  
  let progressText = '';
  if (status === BOOK_STATUS.READ) {
    progressText = '100%';
  } else if (status === BOOK_STATUS.READING) {
    const pagesRead = parseInt(book['Pages Read'] || '0');
    const totalPages = parseInt(book['Page Count'] || '0');
    if (totalPages > 0) {
      progressText = `${Math.round((pagesRead / totalPages) * 100)}%`;
    }
  }
  
  return `            <li class="flex items-center border-b border-b-gray-100" data-id="${isbn}">
                <div class="self-start p-4">
                    <Icon name="${iconName}" class="w-8 ${iconColor} shrink-0" />
                    <span class="text-gray-300 font-bold">${progressText}</span>
                </div>
                <Biblio
                    title="${title}"
                    author="${authors}"
                    year="${year}"
                    cover="${coverFilename}"
                >${description ? `
                    ${description}` : ''}
                </Biblio>
            </li>`;
}

/**
 * Check if a book already exists in an MDX file
 */
function bookExistsInMDX(mdxContent, bookTitle) {
  const normalizedTitle = bookTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  return mdxContent.toLowerCase().includes(normalizedTitle);
}

/**
 * Update an existing book entry in the content with new information
 */
function updateExistingBookEntry(content, book, newBookMDX) {
  const isbn = book.ISBN || '';
  if (!isbn) {
    console.log(`    ⚠️  No ISBN found for book "${book.Title}" - cannot update`);
    return { updated: false, content };
  }
  
  // Find the book entry by ISBN using data-id attribute
  const isbnPattern = new RegExp(`data-id="${isbn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i');
  const isbnMatch = content.search(isbnPattern);
  
  if (isbnMatch === -1) {
    console.log(`    Debug: Could not find book with ISBN ${isbn} in content`);
    return { updated: false, content };
  }
  
  console.log(`    Found book entry with ISBN ${isbn} at position ${isbnMatch}`);
  
  // Find the start of the book entry (look for the <li> tag before the ISBN)
  let liStart = content.lastIndexOf('<li class="flex items-center border-b border-b-gray-100"', isbnMatch);
  if (liStart === -1) {
    // Try alternative li pattern
    liStart = content.lastIndexOf('<li class="flex items-center border-b border-b-gray-100">', isbnMatch);
  }
  
  if (liStart === -1) {
    console.log(`    Debug: Could not find <li> start tag for ISBN ${isbn}`);
    return { updated: false, content };
  }
  
  // Find the end of the book entry (look for the closing </li> tag)
  const liEnd = content.indexOf('</li>', isbnMatch);
  if (liEnd === -1) {
    console.log(`    Debug: Could not find </li> end tag for ISBN ${isbn}`);
    return { updated: false, content };
  }
  
  // Replace the entire book entry
  const beforeEntry = content.substring(0, liStart);
  const afterEntry = content.substring(liEnd + 6); // +6 for '</li>'
  
  const updatedContent = beforeEntry + newBookMDX + afterEntry;
  
  return { updated: true, content: updatedContent };
}

/**
 * Extract book information from MDX content
 */
function extractBooksFromMDX(content) {
  const books = [];
  
  // First try to find books with data-id attributes (new format)
  let bookPattern = /<li[^>]*data-id="([^"]*)"[^>]*>[\s\S]*?<Biblio[^>]*title="([^"]*)"[^>]*author="([^"]*)"[^>]*year="([^"]*)"[^>]*>([\s\S]*?)<\/Biblio>[\s\S]*?<\/li>/g;
  
  let match;
  while ((match = bookPattern.exec(content)) !== null) {
    books.push({
      isbn: match[1],
      title: match[2],
      author: match[3],
      year: match[4],
      description: match[5].trim()
    });
  }
  
  // If no books found with data-id, try the old format without data-id
  if (books.length === 0) {
    bookPattern = /<li[^>]*>[\s\S]*?<Biblio[^>]*title="([^"]*)"[^>]*author="([^"]*)"[^>]*year="([^"]*)"[^>]*>([\s\S]*?)<\/Biblio>[\s\S]*?<\/li>/g;
    
    while ((match = bookPattern.exec(content)) !== null) {
      books.push({
        isbn: '', // No ISBN in old format
        title: match[1],
        author: match[2],
        year: match[3],
        description: match[4].trim()
      });
    }
  }
  
  return books;
}

/**
 * Read all existing yearly reading list files and extract book information
 */
async function readAllExistingBooks() {
  const allBooks = [];
  
  try {
    const files = await fs.readdir(BOOKS_CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('-reading-list.mdx'));
    
    for (const filename of mdxFiles) {
      const filepath = path.join(BOOKS_CONTENT_DIR, filename);
      const content = await fs.readFile(filepath, 'utf-8');
      const books = extractBooksFromMDX(content);
      
      console.log(`Read ${books.length} books from ${filename}`);
      allBooks.push(...books);
    }
  } catch (error) {
    console.warn('Error reading existing books:', error.message);
  }
  
  return allBooks;
}

/**
 * Handle books that are already read but don't exist in any yearly file
 */
async function handleReadBooks(books, allExistingBooks) {
  // Find books that are already read
  const readBooks = books.filter(book => getBookStatus(book) === BOOK_STATUS.READ);
  
  if (readBooks.length === 0) {
    console.log('No read books to process');
    return;
  }
  
  console.log(`Processing ${readBooks.length} read books...`);
  
  // Find read books that don't exist in any yearly file
  const missingReadBooks = readBooks.filter(book => {
    const bookExists = allExistingBooks.some(existingBook => 
      existingBook.isbn === book.ISBN || 
      existingBook.title.toLowerCase().includes(book.Title.toLowerCase()) ||
      book.Title.toLowerCase().includes(existingBook.title.toLowerCase())
    );
    return !bookExists;
  });
  
  if (missingReadBooks.length === 0) {
    console.log('All read books already exist in yearly files');
    return;
  }
  
  console.log(`Found ${missingReadBooks.length} read books not in yearly files:`);
  missingReadBooks.forEach(book => {
    console.log(`  + ${book.Title} by ${book.Authors} (${book['Published At']?.substring(0, 4) || 'Unknown year'})`);
  });
  
  // Add missing read books to the current year's file
  await addReadBooksToCurrentYear(missingReadBooks);
}

/**
 * Add read books to the current year's reading list
 */
async function addReadBooksToCurrentYear(books) {
  const filename = `${CURRENT_YEAR}-reading-list.mdx`;
  const filepath = path.join(BOOKS_CONTENT_DIR, filename);
  
  let existingContent = '';
  try {
    existingContent = await fs.readFile(filepath, 'utf-8');
  } catch (error) {
    console.log(`Creating new yearly reading list for ${CURRENT_YEAR} to add read books`);
    existingContent = `---
blurb: Books that I plan to read in ${CURRENT_YEAR}.
_slug: ${CURRENT_YEAR}-reading-list
image: ${CURRENT_YEAR}.jpg
year: "${CURRENT_YEAR}"
---

import Quote from "../../components/quote"
import Biblio from "../../components/biblio"
import Title from "../../components/title"
import { Icon } from 'astro-icon'

<div class="py-2 w-full max-w-3xl">
        <Title title="${CURRENT_YEAR}" subtitle="Reading List" />
        <ul class="list-none">
        </ul>
    </div>`;
  }
  
  // Generate MDX for read books
  const readBooksMDX = books.map(book => {
    const status = getBookStatus(book);
    return generateBookMDX(book, status);
  }).join('\n');
  
  // Insert read books before the closing </ul> tag
  const insertIndex = existingContent.lastIndexOf('        </ul>');
  if (insertIndex !== -1) {
    const beforeClosing = existingContent.substring(0, insertIndex);
    const afterClosing = existingContent.substring(insertIndex);
    existingContent = beforeClosing + '\n' + readBooksMDX + '\n' + afterClosing;
  }
  
  await fs.writeFile(filepath, existingContent);
  console.log(`Added ${books.length} read books to ${filename}`);
}

/**
 * Update or create yearly reading list MDX file
 */
async function updateYearlyReadingList(year, books, allExistingBooks) {
  const filename = `${year}-reading-list.mdx`;
  const filepath = path.join(BOOKS_CONTENT_DIR, filename);
  
  let existingContent = '';
  try {
    existingContent = await fs.readFile(filepath, 'utf-8');
  } catch (error) {
    // File doesn't exist, create new one
    console.log(`Creating new yearly reading list for ${year}`);
  }
  
  // Filter books that are not yet read (regardless of publication year)
  const yearBooks = books.filter(book => getBookStatus(book) === BOOK_STATUS.WAIT);
  
  if (yearBooks.length === 0) {
    console.log(`No books to add for ${year}`);
    return;
  }
  
  // Filter out books that already exist in any yearly file
  const newYearBooks = yearBooks.filter(book => {
    const bookExists = allExistingBooks.some(existingBook => 
      existingBook.isbn === book.ISBN || 
      existingBook.title.toLowerCase().includes(book.Title.toLowerCase()) ||
      book.Title.toLowerCase().includes(existingBook.title.toLowerCase())
    );
    
    if (bookExists) {
      console.log(`  ⏭️  Skipping "${book.Title}" - already exists in a reading list`);
      return false;
    }
    return true;
  });
  
  if (newYearBooks.length === 0) {
    console.log(`All books for ${year} already exist in reading lists`);
    return;
  }
  
  console.log(`Found ${newYearBooks.length} new books to add for ${year}:`);
  newYearBooks.forEach(book => {
    console.log(`  + ${book.Title} by ${book.Authors}`);
  });
  
  // Generate new content
  const newBooksMDX = newYearBooks.map(book => {
    const status = getBookStatus(book);
    return generateBookMDX(book, status);
  }).join('\n');
  
  if (existingContent) {
    // Insert new books before the closing </ul> tag
    const insertIndex = existingContent.lastIndexOf('        </ul>');
    if (insertIndex !== -1) {
      const beforeClosing = existingContent.substring(0, insertIndex);
      const afterClosing = existingContent.substring(insertIndex);
      existingContent = beforeClosing + '\n' + newBooksMDX + '\n' + afterClosing;
    }
  } else {
    // Create new file
    existingContent = `---
blurb: Books that I plan to read in ${year}.
_slug: ${year}-reading-list
image: ${year}.jpg
year: "${year}"
---

import Quote from "../../components/quote"
import Biblio from "../../components/biblio"
import Title from "../../components/title"
import { Icon } from 'astro-icon'

<div class="py-2 w-full max-w-3xl">
        <Title title="${year}" subtitle="Reading List" />
        <ul class="list-none">
${newBooksMDX}
        </ul>
    </div>`;
  }
  
  await fs.writeFile(filepath, existingContent);
  console.log(`Updated ${filename} with ${newYearBooks.length} new books`);
}

/**
 * Update the index.astro file with currently reading books
 */
async function updateIndexPage(books) {
  let indexContent = await fs.readFile(INDEX_PATH, 'utf-8');
  
  // Find currently reading books
  const readingBooks = books.filter(book => getBookStatus(book) === BOOK_STATUS.READING);
  
  if (readingBooks.length === 0) {
    console.log('No books currently being read');
    return;
  }
  
  console.log(`Found ${readingBooks.length} books currently being read:`);
  readingBooks.forEach(book => {
    const pagesRead = parseInt(book['Pages Read'] || '0');
    const totalPages = parseInt(book['Page Count'] || '0');
    const progress = totalPages > 0 ? Math.round((pagesRead / totalPages) * 100) : 0;
    console.log(`  - ${book.Title} by ${book.Authors} (${progress}% complete)`);
  });
  
  // Find the reading list section in index.astro
  const readingListStart = indexContent.indexOf('<Title title="2025" subtitle="Reading List" />');
  if (readingListStart === -1) {
    console.warn('Could not find reading list section in index.astro');
    return;
  }
  
  // Find the end of the reading list section (look for the closing </ul> tag after the title)
  const ulStart = indexContent.indexOf('        <ul class="list-none">', readingListStart);
  if (ulStart === -1) {
    console.warn('Could not find start of reading list in index.astro');
    return;
  }
  
  const ulEnd = indexContent.indexOf('        </ul>', ulStart);
  if (ulEnd === -1) {
    console.warn('Could not find end of reading list in index.astro');
    return;
  }
  
  // Get the current reading list content
  const currentReadingListContent = indexContent.substring(ulStart, ulEnd);
  
  let hasUpdates = false;
  let updatedContent = indexContent;
  
  // Process each currently reading book
  for (const book of readingBooks) {
    const bookExists = bookExistsInMDX(currentReadingListContent, book.Title);
    
    if (bookExists) {
      console.log(`  🔄 Updating existing book: "${book.Title}"`);
      
      // Try to fetch updated book details from Google Books API
      let googleData = null;
      if (book.ISBN) {
        googleData = await fetchBookDetails(book.ISBN);
      }
      
      // Update the existing book entry
      const updatedBookMDX = generateBookMDX(book, getBookStatus(book), googleData);
      const updatedContentResult = updateExistingBookEntry(updatedContent, book, updatedBookMDX);
      
      if (updatedContentResult.updated) {
        updatedContent = updatedContentResult.content;
        hasUpdates = true;
        console.log(`    ✅ Updated progress, year, and description for "${book.Title}"`);
      } else {
        console.log(`    ⚠️  Could not update "${book.Title}" - entry not found`);
      }
    } else {
      console.log(`  ➕ Adding new book: "${book.Title}"`);
      
      // Try to fetch book details from Google Books API
      let googleData = null;
      if (book.ISBN) {
        googleData = await fetchBookDetails(book.ISBN);
      }
      
      // Generate new book entry
      const newBookMDX = generateBookMDX(book, getBookStatus(book), googleData);
      
      // Insert new book before the closing </ul> tag
      const beforeClosing = updatedContent.substring(0, ulEnd);
      const afterClosing = updatedContent.substring(ulEnd);
      updatedContent = beforeClosing + '\n' + newBookMDX + '\n' + afterClosing;
      
      hasUpdates = true;
    }
  }
  
  if (hasUpdates) {
    await fs.writeFile(INDEX_PATH, updatedContent);
    console.log('Updated index.astro with book progress and descriptions');
  } else {
    console.log('No updates needed for index.astro');
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting book update process...');
    console.log(`Current year: ${CURRENT_YEAR}`);
    console.log(`CSV file: ${CSV_PATH}`);
    console.log(`Books content directory: ${BOOKS_CONTENT_DIR}`);
    console.log(`Index file: ${INDEX_PATH}`);
    console.log('');
    
    // Read and parse CSV file
    const csvContent = await fs.readFile(CSV_PATH, 'utf-8');
    const books = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Parsed ${books.length} books from CSV`);
    
    // No filtering for now
    const relevantBooks = books
    
    console.log(`Found ${relevantBooks.length} relevant books (owned and in My books)`);
    
    // Count books by status
    const readBooks = relevantBooks.filter(book => getBookStatus(book) === BOOK_STATUS.READ);
    const readingBooks = relevantBooks.filter(book => getBookStatus(book) === BOOK_STATUS.READING);
    const waitBooks = relevantBooks.filter(book => getBookStatus(book) === BOOK_STATUS.WAIT);
    
    console.log(`Book status breakdown:`);
    console.log(`  - Read: ${readBooks.length}`);
    console.log(`  - Reading: ${readingBooks.length}`);
    console.log(`  - Wait: ${waitBooks.length}`);
    console.log('');
    
    // Read all existing books from yearly reading list files
    console.log('Reading existing books from yearly reading lists...');
    const allExistingBooks = await readAllExistingBooks();
    console.log(`Found ${allExistingBooks.length} existing books across all yearly files`);
    
    // Update yearly reading lists
    await updateYearlyReadingList(CURRENT_YEAR, relevantBooks, allExistingBooks);
    
    // Handle books that are already read but don't exist in any yearly file
    await handleReadBooks(relevantBooks, allExistingBooks);
    
    // Update index.astro with currently reading books
    await updateIndexPage(relevantBooks);
    
    console.log('');
    console.log('Book update process completed successfully!');
    
  } catch (error) {
    console.error('Error updating books:', error);
    process.exit(1);
  }
}

// Run the script
main();
