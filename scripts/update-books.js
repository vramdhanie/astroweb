#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BOOKS_CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'books');
const INDEX_PAGE = path.join(__dirname, '..', 'src', 'pages', 'index.astro');
const CSV_FILE = path.join(__dirname, '..', 'bookshelf.csv');
const CURRENT_YEAR = new Date().getFullYear();

// Google Books API base URL
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Fetch book details from Google Books API
 */
async function fetchBookDetails(isbn) {
  if (!isbn || isbn.trim() === '') {
    return null;
  }

  try {
    console.log(`    Fetching details for ISBN: ${isbn}`);
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=isbn:${isbn.trim()}`);

    if (!response.ok) {
      console.warn(`    Failed to fetch book details for ISBN ${isbn}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      const coverUrl = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail;

      return {
        title: book.title,
        authors: book.authors?.join(', ') || '',
        publishedDate: book.publishedDate,
        description: book.description || '',
        pageCount: book.pageCount,
        cover: coverUrl || 'cover.png'
      };
    } else {
      console.log(`    No book found for ISBN: ${isbn}`);
    }
  } catch (error) {
    console.warn(`    Error fetching book details for ISBN ${isbn}:`, error.message);
  }
  return null;
}

/**
 * Determine book status based on CSV data
 */
function getBookStatus(book) {
  const pagesRead = parseInt(book['Pages Read']) || 0;
  const pageCount = parseInt(book['Page Count']) || 0;
  const read = parseInt(book['Read']) || 0;
  
  if (read === 1) {
    return 'READ';
  } else if (pagesRead > 0 && pageCount > 0) {
    return 'READING';
  } else {
    return 'WAIT';
  }
}

/**
 * Extract books from MDX/Astro content
 */
function extractBooksFromContent(content) {
  const books = [];
  
  // Find books with data-id attributes (new format)
  // Handle both self-closing and closing tags, with flexible whitespace
  let bookPattern = /<li[^>]*data-id="([^"]*)"[^>]*>[\s\S]*?<Biblio[\s\S]*?title="([^"]*)"[\s\S]*?author="([^"]*)"[\s\S]*?year="([^"]*)"[\s\S]*?cover="([^"]*)"[\s\S]*?(\/>|>([\s\S]*?)<\/Biblio>)[\s\S]*?<\/li>/g;
  
  let match;
  while ((match = bookPattern.exec(content)) !== null) {
    books.push({
      isbn: match[1],
      title: match[2],
      author: match[3],
      year: match[4],
      cover: match[5],
      description: match[7] ? match[7].trim() : '',
      sourceFile: 'unknown', // Will be set by caller
      sourceIndex: -1 // Will be set by caller
    });
  }
  
  return books;
}

/**
 * Read all existing books from all sources
 */
async function readAllExistingBooks() {
  const allBooks = [];
  
  // Read index.astro
  try {
    const indexContent = await fs.readFile(INDEX_PAGE, 'utf-8');
    const indexBooks = extractBooksFromContent(indexContent);
    indexBooks.forEach(book => {
      book.sourceFile = 'index.astro';
      book.sourceIndex = allBooks.length;
    });
    allBooks.push(...indexBooks);
    console.log(`  Found ${indexBooks.length} books in index.astro`);
  } catch (error) {
    console.error(`  Error reading index.astro:`, error.message);
  }
  
  // Read all yearly files
  try {
    const files = await fs.readdir(BOOKS_CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('-reading-list.mdx'));
    
    for (const filename of mdxFiles) {
      const filepath = path.join(BOOKS_CONTENT_DIR, filename);
      const content = await fs.readFile(filepath, 'utf-8');
      const yearlyBooks = extractBooksFromContent(content);
      
      yearlyBooks.forEach(book => {
        book.sourceFile = filename;
        book.sourceIndex = allBooks.length;
      });
      
      allBooks.push(...yearlyBooks);
      console.log(`  Found ${yearlyBooks.length} books in ${filename}`);
    }
  } catch (error) {
    console.error(`  Error reading yearly files:`, error.message);
  }
  
  return allBooks;
}

/**
 * Parse CSV file and filter relevant books
 */
async function parseCSV() {
  try {
    const csvContent = await fs.readFile(CSV_FILE, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    // No filtering for now
    const relevantBooks = records
    
    console.log(`  Found ${relevantBooks.length} relevant books in CSV`);
    return relevantBooks;
  } catch (error) {
    console.error(`  Error parsing CSV:`, error.message);
    return [];
  }
}

/**
 * Generate book HTML/MDX content
 */
function generateBookContent(book, status, googleData = null) {
  const title = googleData?.title || book['Title'];
  const author = googleData?.authors || book['Authors'];
  const year = googleData?.publishedDate?.substring(0, 4) || book['Published At']?.substring(0, 4) || '';
  const cover = googleData?.cover || book['cover'] || 'cover.png';
  const description = googleData?.description || book['Description'] || '';
  
  let iconName, iconClass, progressText;
  
  switch (status) {
    case 'READ':
      iconName = 'check';
      iconClass = 'text-green-400';
      progressText = '100%';
      break;
    case 'READING':
      iconName = 'reading';
      iconClass = 'text-orange-400';
      const pagesRead = parseInt(book['Pages Read']) || 0;
      const pageCount = parseInt(book['Page Count']) || 0;
      progressText = pageCount > 0 ? `${Math.round((pagesRead / pageCount) * 100)}%` : '';
      break;
    case 'WAIT':
      iconName = 'wait';
      iconClass = 'text-yellow-400';
      progressText = '';
      break;
  }
  
  return `<li class="flex items-center border-b border-b-gray-100" data-id="${book['ISBN']}">
    <div class="self-start p-4">
        <Icon name="${iconName}" class="w-8 ${iconClass} shrink-0" />
        <span class="text-gray-300 font-bold">${progressText}</span>
    </div>
    <Biblio
        title="${title}"
        author="${author}"
        year="${year}"
        cover="${cover}"
    >${description ? `\n        ${description}` : ''}
    </Biblio>
</li>`;
}

/**
 * Update book in content
 */
function updateBookInContent(content, isbn, newContent) {
  const isbnPattern = new RegExp(`data-id="${isbn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i');
  const isbnMatch = content.search(isbnPattern);
  
  if (isbnMatch === -1) {
    return content;
  }
  
  // Find the book entry boundaries
  const bookStart = content.lastIndexOf('<li', isbnMatch);
  const bookEnd = content.indexOf('</li>', isbnMatch) + 5;
  
  if (bookStart === -1 || bookEnd === -1) {
    return content;
  }
  
  // Replace the book entry
  const beforeBook = content.substring(0, bookStart);
  const afterBook = content.substring(bookEnd);
  
  return beforeBook + newContent + afterBook;
}

/**
 * Add book to content
 */
function addBookToContent(content, newBookContent, targetTag = '</ul>') {
  const targetIndex = content.lastIndexOf(targetTag);
  if (targetIndex === -1) {
    return content;
  }
  
  const beforeTarget = content.substring(0, targetIndex);
  const afterTarget = content.substring(targetIndex);
  
  return beforeTarget + '\n            ' + newBookContent + '\n        ' + afterTarget;
}

/**
 * Remove book from content
 */
function removeBookFromContent(content, isbn) {
  const isbnPattern = new RegExp(`data-id="${isbn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i');
  const isbnMatch = content.search(isbnPattern);
  
  if (isbnMatch === -1) {
    return content;
  }
  
  // Find the book entry boundaries
  const bookStart = content.lastIndexOf('<li', isbnMatch);
  const bookEnd = content.indexOf('</li>', isbnMatch) + 5;
  
  if (bookStart === -1 || bookEnd === -1) {
    return content;
  }
  
  // Remove the book entry
  const beforeBook = content.substring(0, bookStart);
  const afterBook = content.substring(bookEnd);
  
  return beforeBook + afterBook;
}

/**
 * Reorganize books based on their current reading status
 */
async function reorganizeBooksByStatus(csvBooks, existingBooks) {
  console.log('  Reorganizing books based on current status...');
  
  // Group books by their current status
  const readingBooks = csvBooks.filter(book => getBookStatus(book) === 'READING');
  const waitBooks = csvBooks.filter(book => getBookStatus(book) === 'WAIT');
  const readBooks = csvBooks.filter(book => getBookStatus(book) === 'READ');
  
  console.log(`    Currently reading: ${readingBooks.length}`);
  console.log(`    To be read: ${waitBooks.length}`);
  console.log(`    Completed: ${readBooks.length}`);
  
  // Process currently reading books - they should be in index.astro
  for (const book of readingBooks) {
    const isbn = book['ISBN'];
    const existingBook = existingBooks.find(b => b.isbn === isbn);
    
    if (existingBook && existingBook.sourceFile !== 'index.astro') {
      console.log(`    📚 Moving "${book['Title']}" to index.astro (currently reading)`);
      
      // Remove from current file
      const currentFilePath = path.join(BOOKS_CONTENT_DIR, existingBook.sourceFile);
      const currentContent = await fs.readFile(currentFilePath, 'utf-8');
      const updatedCurrentContent = removeBookFromContent(currentContent, isbn);
      await fs.writeFile(currentFilePath, updatedCurrentContent);
      
      // Add to index.astro
      const indexContent = await fs.readFile(INDEX_PAGE, 'utf-8');
      const newBookContent = generateBookContent(book, 'READING');
      const updatedIndexContent = addBookToContent(indexContent, newBookContent);
      await fs.writeFile(INDEX_PAGE, updatedIndexContent);
    }
  }
  
  // Process wait books - they should be in the current year's file
  for (const book of waitBooks) {
    const isbn = book['ISBN'];
    const existingBook = existingBooks.find(b => b.isbn === isbn);
    
    if (existingBook && existingBook.sourceFile === 'index.astro') {
      console.log(`    📚 Moving "${book['Title']}" from index.astro to ${CURRENT_YEAR}-reading-list.mdx (no longer reading)`);
      
      // Remove from index.astro
      const indexContent = await fs.readFile(INDEX_PAGE, 'utf-8');
      const updatedIndexContent = removeBookFromContent(indexContent, isbn);
      await fs.writeFile(INDEX_PAGE, updatedIndexContent);
      
      // Add to current year's file
      const targetFile = `${CURRENT_YEAR}-reading-list.mdx`;
      const targetFilePath = path.join(BOOKS_CONTENT_DIR, targetFile);
      
      // Create file if it doesn't exist
      if (!(await fs.access(targetFilePath).then(() => true).catch(() => false))) {
        const newFileContent = `---
blurb: "Books to read in ${CURRENT_YEAR}"
_slug: "${CURRENT_YEAR}-reading-list"
image: "/images/books/${CURRENT_YEAR}.jpg"
year: ${CURRENT_YEAR}
---

import { Quote } from '../../components/quote.astro'
import { Biblio } from '../../components/biblio.tsx'
import { Title } from '../../components/title.astro'
import { Icon } from 'astro-icon'

<Title title="${CURRENT_YEAR}" subtitle="Reading List" />

<div class="mx-auto max-w-4xl">
    <ul class="list-none">
    </ul>
</div>`;
        await fs.writeFile(targetFilePath, newFileContent);
      }
      
      const targetContent = await fs.readFile(targetFilePath, 'utf-8');
      const newBookContent = generateBookContent(book, 'WAIT');
      const updatedTargetContent = addBookToContent(targetContent, newBookContent);
      await fs.writeFile(targetFilePath, updatedTargetContent);
    }
  }
  
  // Process read books - they should stay in their current yearly files
  // If they're in index.astro, move them to the current year's file
  for (const book of readBooks) {
    const isbn = book['ISBN'];
    const existingBook = existingBooks.find(b => b.isbn === isbn);
    
    if (existingBook && existingBook.sourceFile === 'index.astro') {
      console.log(`    📚 Moving "${book['Title']}" from index.astro to ${CURRENT_YEAR}-reading-list.mdx (completed)`);
      
      // Remove from index.astro
      const indexContent = await fs.readFile(INDEX_PAGE, 'utf-8');
      const updatedIndexContent = removeBookFromContent(indexContent, isbn);
      await fs.writeFile(INDEX_PAGE, updatedIndexContent);
      
      // Add to current year's file
      const targetFile = `${CURRENT_YEAR}-reading-list.mdx`;
      const targetFilePath = path.join(BOOKS_CONTENT_DIR, targetFile);
      
      // Create file if it doesn't exist
      if (!(await fs.access(targetFilePath).then(() => true).catch(() => false))) {
        const newFileContent = `---
blurb: "Books to read in ${CURRENT_YEAR}"
_slug: "${CURRENT_YEAR}-reading-list"
image: "/images/books/${CURRENT_YEAR}.jpg"
year: ${CURRENT_YEAR}
---

import { Quote } from '../../components/quote.astro'
import { Biblio } from '../../components/biblio.tsx'
import { Title } from '../../components/title.astro'
import { Icon } from 'astro-icon'

<Title title="${CURRENT_YEAR}" subtitle="Reading List" />

<div class="mx-auto max-w-4xl">
    <ul class="list-none">
    </ul>
</div>`;
        await fs.writeFile(targetFilePath, newFileContent);
      }
      
      const targetContent = await fs.readFile(targetFilePath, 'utf-8');
      const newBookContent = generateBookContent(book, 'READ');
      const updatedTargetContent = addBookToContent(targetContent, newBookContent);
      await fs.writeFile(targetFilePath, updatedTargetContent);
    }
  }
  
  console.log('  Book reorganization completed!');
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting comprehensive book update process...');
    console.log(`Current year: ${CURRENT_YEAR}`);
    console.log('');
    
    // Step 1: Read all existing books
    console.log('Step 1: Reading all existing books...');
    const existingBooks = await readAllExistingBooks();
    console.log(`Total existing books: ${existingBooks.length}`);
    console.log('');
    
    // Step 2: Parse CSV
    console.log('Step 2: Parsing CSV file...');
    const csvBooks = await parseCSV();
    console.log('');
    
    // Step 3: Process each CSV book
    console.log('Step 3: Processing CSV books...');
    const processedBooks = [];
    
    for (const csvBook of csvBooks) {
      const isbn = csvBook['ISBN'];
      const status = getBookStatus(csvBook);
      
      console.log(`  Processing: ${csvBook['Title']} (${status})`);
      
      // Check if book already exists
      const existingBook = existingBooks.find(book => book.isbn === isbn);
      
      if (existingBook) {
        console.log(`    ✅ Book exists, updating details`);
        
        // Update existing book with new CSV data
        const updatedContent = generateBookContent(csvBook, status);
        
        // Update in the appropriate file
        if (existingBook.sourceFile === 'index.astro') {
          const indexContent = await fs.readFile(INDEX_PAGE, 'utf-8');
          const updatedIndexContent = updateBookInContent(indexContent, isbn, updatedContent);
          await fs.writeFile(INDEX_PAGE, updatedIndexContent);
        } else {
          const filepath = path.join(BOOKS_CONTENT_DIR, existingBook.sourceFile);
          const fileContent = await fs.readFile(filepath, 'utf-8');
          const updatedFileContent = updateBookInContent(fileContent, isbn, updatedContent);
          await fs.writeFile(filepath, updatedFileContent);
        }
        
        processedBooks.push({
          ...csvBook,
          status,
          action: 'updated',
          sourceFile: existingBook.sourceFile
        });
        
      } else {
        console.log(`    ➕ New book, adding to system`);
        
        // Fetch additional details from Google Books API
        const googleData = await fetchBookDetails(isbn);
        const newBookContent = generateBookContent(csvBook, status, googleData);
        
        // Determine where to add the book based on status
        let targetFile;
        if (status === 'READING') {
          targetFile = 'index.astro';
        } else {
          targetFile = `${CURRENT_YEAR}-reading-list.mdx`;
        }
        
        // Add book to appropriate file
        if (targetFile === 'index.astro') {
          const indexContent = await fs.readFile(INDEX_PAGE, 'utf-8');
          const updatedIndexContent = addBookToContent(indexContent, newBookContent);
          await fs.writeFile(INDEX_PAGE, updatedIndexContent);
        } else {
          const filepath = path.join(BOOKS_CONTENT_DIR, targetFile);
          
          // Create file if it doesn't exist
          if (!(await fs.access(filepath).then(() => true).catch(() => false))) {
            const newFileContent = `---
blurb: "Books to read in ${CURRENT_YEAR}"
_slug: "${CURRENT_YEAR}-reading-list"
image: "/images/books/${CURRENT_YEAR}.jpg"
year: ${CURRENT_YEAR}
---

import { Quote } from '../../components/quote.astro'
import { Biblio } from '../../components/biblio.tsx'
import { Title } from '../../components/title.astro'
import { Icon } from 'astro-icon'

<Title title="${CURRENT_YEAR}" subtitle="Reading List" />

<div class="mx-auto max-w-4xl">
    <ul class="list-none">
    </ul>
</div>`;
            await fs.writeFile(filepath, newFileContent);
          }
          
          const fileContent = await fs.readFile(filepath, 'utf-8');
          const updatedFileContent = addBookToContent(fileContent, newBookContent);
          await fs.writeFile(filepath, updatedFileContent);
        }
        
        processedBooks.push({
          ...csvBook,
          status,
          action: 'added',
          sourceFile: targetFile
        });
        
        // Add delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('');
    console.log('Step 4: Summary');
    console.log(`  Total books processed: ${processedBooks.length}`);
    console.log(`  Books updated: ${processedBooks.filter(b => b.action === 'updated').length}`);
    console.log(`  Books added: ${processedBooks.filter(b => b.action === 'added').length}`);
    
    // Step 5: Reorganize books based on current status
    console.log('');
    console.log('Step 5: Reorganizing books based on current status...');
    
    await reorganizeBooksByStatus(csvBooks, existingBooks);
    
    console.log('');
    console.log('Book update process completed successfully!');
    
  } catch (error) {
    console.error('Error updating books:', error);
    process.exit(1);
  }
}

// Run the script
main();
