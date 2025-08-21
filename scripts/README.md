# Book Update Script

This script automatically updates your Astro website's book reading lists based on the `bookshelf.csv` file.

## What it does

1. **Parses the CSV file**: Reads your bookshelf.csv file to get book information
2. **Determines book status**: 
   - ✅ **Read** (100% complete) - Green check icon
   - 📖 **Reading** (partially read) - Orange reading icon  
   - ⏳ **Wait** (not started) - Yellow wait icon
3. **Updates MDX files**:
   - Books currently being read go to `src/pages/index.astro`
   - Books not yet read go to yearly reading list files (`src/content/books/YYYY-reading-list.mdx`)
4. **Fetches book details**: Uses Google Books API to get cover images and descriptions when available

## Usage

Run the script from your project root:

```bash
yarn update-books
```

Or directly with Node:

```bash
node scripts/update-books.js
```

## Requirements

- Node.js 18+ (for built-in fetch API)
- `csv-parse` dependency (already installed)
- Valid `bookshelf.csv` file in project root

## CSV Format

The script expects these columns in your CSV:
- `Book Id`: Unique identifier
- `ISBN`: Book ISBN for Google Books API lookup
- `Title`: Book title
- `Authors`: Author names
- `Bookshelf`: Must be "My books" to be included
- `Tags`: Must include "Own" to be included
- `Read`: "1" if fully read, "0" if not
- `Pages Read`: Number of pages completed
- `Page Count`: Total pages in book
- `Published At`: Publication date (YYYY-MM-DD format)
- `Description`: Book description

## Output

- **Currently reading books**: Added to `src/pages/index.astro` in the 2025 reading list section
- **Unread books**: Added to yearly reading list files based on publication year
- **Cover images**: Uses Google Books API thumbnails when available, falls back to local filenames

## Notes

- The script is designed to be run multiple times safely
- **Duplicate Prevention**: Automatically checks for existing books before adding them
- **Safe Updates**: Will not duplicate books that already exist in MDX files
- Books are categorized by publication year for yearly reading lists
- Currently reading books are always shown on the main page
- The script handles missing data gracefully and provides warnings for API failures
- Provides clear logging showing which books are skipped vs. added

## Troubleshooting

- **CSV parsing errors**: Check that your CSV file is properly formatted
- **API failures**: Google Books API may have rate limits or temporary issues
- **File not found errors**: Ensure the script is run from the project root directory
- **Permission errors**: Make sure you have write access to the source files
