#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BOOKS_CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'books');
const INDEX_PAGE = path.join(__dirname, '..', 'src', 'pages', 'index.astro');

// Google Books API base URL
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Fetch book cover from Google Books API
 */
async function fetchBookCover(isbn) {
  if (!isbn || isbn.trim() === '') {
    return null;
  }
  
  try {
    console.log(`Fetching cover for ISBN: ${isbn}`);
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=isbn:${isbn.trim()}`);
    
    if (!response.ok) {
      console.warn(`Failed to fetch book cover for ISBN ${isbn}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      const coverUrl = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail;
      
      if (coverUrl) {
        console.log(`Found cover for: ${book.title}`);
        return coverUrl;
      } else {
        console.log(`No cover found for: ${book.title}`);
      }
    } else {
      console.log(`No book found for ISBN: ${isbn}`);
    }
  } catch (error) {
    console.warn(`Error fetching book cover for ISBN ${isbn}:`, error.message);
  }
  return null;
}

/**
 * Extract book information from MDX content
 */
function extractBooksFromMDX(content) {
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
      currentCover: match[5],
      description: match[7] ? match[7].trim() : '' // match[7] contains description if closing tag, empty if self-closing
    });
  }
  
  // If no books found with data-id, try the old format without data-id
  if (books.length === 0) {
    bookPattern = /<li[^>]*>[\s\S]*?<Biblio[^>]*title="([^"]*)"[^>]*author="([^"]*)"[^>]*year="([^"]*)"[^>]*cover="([^"]*)"[^>]*>([\s\S]*?)<\/Biblio>[\s\S]*?<\/li>/g;
    
    while ((match = bookPattern.exec(content)) !== null) {
      books.push({
        isbn: '', // No ISBN in old format
        title: match[1],
        author: match[2],
        year: match[3],
        currentCover: match[4],
        description: match[5].trim()
      });
    }
  }
  
  return books;
}

/**
 * Update cover attributes in MDX content
 */
function updateCoverInContent(content, isbn, newCoverUrl) {
  if (!isbn || !newCoverUrl) {
    return content;
  }
  
  // Find the book entry by ISBN and update its cover
  const isbnPattern = new RegExp(`data-id="${isbn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i');
  const isbnMatch = content.search(isbnPattern);
  
  if (isbnMatch === -1) {
    console.log(`    Could not find book with ISBN ${isbn} in content`);
    return content;
  }
  
  // Find the cover attribute within this specific book entry
  // Look for the cover attribute after the ISBN but before the next book entry
  const bookStart = content.lastIndexOf('<li', isbnMatch);
  const nextBookStart = content.indexOf('<li', isbnMatch + 1);
  const searchEnd = nextBookStart !== -1 ? nextBookStart : content.length;
  
  const bookSection = content.substring(bookStart, searchEnd);
  const coverPattern = /cover="([^"]*)"/;
  const coverMatch = bookSection.search(coverPattern);
  
  if (coverMatch === -1) {
    console.log(`    Could not find cover attribute for ISBN ${isbn}`);
    return content;
  }
  
  // Calculate the actual position in the full content
  const actualCoverStart = bookStart + coverMatch;
  const actualCoverEnd = content.indexOf('"', actualCoverStart + 7) + 1;
  
  // Replace the cover attribute
  const beforeCover = content.substring(0, actualCoverStart);
  const afterCover = content.substring(actualCoverEnd);
  
  const updatedContent = beforeCover + `cover="${newCoverUrl}"` + afterCover;
  
  return updatedContent;
}

/**
 * Process the index.astro page
 */
async function processIndexPage() {
  console.log(`\nProcessing index.astro...`);
  
  try {
    const content = await fs.readFile(INDEX_PAGE, 'utf-8');
    const books = extractBooksFromMDX(content);
    
    if (books.length === 0) {
      console.log(`  No books found in index.astro`);
      return;
    }
    
    console.log(`  Found ${books.length} books`);
    
    let updatedContent = content;
    let updatedCount = 0;
    
    for (const book of books) {
      if (!book.isbn) {
        console.log(`    ⏭️  Skipping "${book.title}" - no ISBN available`);
        continue;
      }
      
      // Skip if already using Google Books cover
      if (book.currentCover.includes('books.google.com')) {
        console.log(`    ✅ "${book.title}" already has Google Books cover`);
        continue;
      }
      
      console.log(`    🔄 Updating cover for "${book.title}" (ISBN: ${book.isbn})`);
      
      const newCoverUrl = await fetchBookCover(book.isbn);
      if (newCoverUrl) {
        updatedContent = updateCoverInContent(updatedContent, book.isbn, newCoverUrl);
        updatedCount++;
        console.log(`      ✅ Updated to: ${newCoverUrl}`);
      } else {
        // Replace with cover.png if no cover found
        console.log(`      ⚠️  No cover found, using cover.png`);
        updatedContent = updateCoverInContent(updatedContent, book.isbn, 'cover.png');
        updatedCount++;
      }
      
      // Add a small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (updatedCount > 0) {
      await fs.writeFile(INDEX_PAGE, updatedContent);
      console.log(`  ✅ Updated ${updatedCount} covers in index.astro`);
    } else {
      console.log(`  ℹ️  No covers updated in index.astro`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error processing index.astro:`, error.message);
  }
}

/**
 * Process a single yearly reading list file
 */
async function processYearlyFile(filename) {
  const filepath = path.join(BOOKS_CONTENT_DIR, filename);
  console.log(`\nProcessing ${filename}...`);
  
  try {
    const content = await fs.readFile(filepath, 'utf-8');
    const books = extractBooksFromMDX(content);
    
    if (books.length === 0) {
      console.log(`  No books found in ${filename}`);
      return;
    }
    
    console.log(`  Found ${books.length} books`);
    
    let updatedContent = content;
    let updatedCount = 0;
    
    for (const book of books) {
      if (!book.isbn) {
        console.log(`    ⏭️  Skipping "${book.title}" - no ISBN available`);
        continue;
      }
      
      // Skip if already using Google Books cover
      if (book.currentCover.includes('books.google.com')) {
        console.log(`    ✅ "${book.title}" already has Google Books cover`);
        continue;
      }
      
      console.log(`    🔄 Updating cover for "${book.title}" (ISBN: ${book.isbn})`);
      
      const newCoverUrl = await fetchBookCover(book.isbn);
      if (newCoverUrl) {
        updatedContent = updateCoverInContent(updatedContent, book.isbn, newCoverUrl);
        updatedCount++;
        console.log(`      ✅ Updated to: ${newCoverUrl}`);
      } else {
        // Replace with cover.png if no cover found
        console.log(`      ⚠️  No cover found, using cover.png`);
        updatedContent = updateCoverInContent(updatedContent, book.isbn, 'cover.png');
        updatedCount++;
      }
      
      // Add a small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (updatedCount > 0) {
      await fs.writeFile(filepath, updatedContent);
      console.log(`  ✅ Updated ${updatedCount} covers in ${filename}`);
    } else {
      console.log(`  ℹ️  No covers updated in ${filename}`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting cover update process...');
    console.log(`Books content directory: ${BOOKS_CONTENT_DIR}`);
    console.log('');
    
    // Get all yearly reading list files
    const files = await fs.readdir(BOOKS_CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('-reading-list.mdx'));
    
    if (mdxFiles.length === 0) {
      console.log('No yearly reading list files found');
      return;
    }
    
    console.log(`Found ${mdxFiles.length} yearly reading list files:`);
    mdxFiles.forEach(file => console.log(`  - ${file}`));
    console.log('');
    
                    // Process the index.astro page first
                await processIndexPage();
                
                // Process each yearly file
                for (const filename of mdxFiles) {
                  await processYearlyFile(filename);
                }
    
    console.log('');
    console.log('Cover update process completed successfully!');
    
  } catch (error) {
    console.error('Error updating covers:', error);
    process.exit(1);
  }
}

// Run the script
main();
