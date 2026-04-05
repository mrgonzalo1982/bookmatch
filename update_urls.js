import fs from 'fs';
import path from 'path';

// Search OpenLibrary
async function searchCover(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const searchUrl = `https://openlibrary.org/search.json?q=${query}&limit=1`;
  
  try {
    const response = await fetch(searchUrl);
    if (!response.ok) return null;
    const json = await response.json();
    if (json.docs && json.docs.length > 0 && json.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${json.docs[0].cover_i}-L.jpg`;
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function processBooks() {
  const mockDataPath = path.join(process.cwd(), 'src/data/mockData.js');
  let content = fs.readFileSync(mockDataPath, 'utf-8');

  // Regex to match each book item block
  const itemRegex = /{[\s\S]*?id:\s*\d+,[\s\S]*?type:\s*'libro',[\s\S]*?title:\s*'([^']+)',[\s\S]*?author:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'[\s\S]*?}/g;
  
  let newContent = content;
  
  // Need to process one by one since we are using async/await
  let matches = [...content.matchAll(itemRegex)];
  
  console.log(`Found ${matches.length} books to update.`);

  for (const match of matches) {
    const fullBlock = match[0];
    const title = match[1];
    const author = match[2];
    const currentImage = match[3];
    
    // Skip if it's already an openlibrary or local link
    if (currentImage.includes('covers.openlibrary.org') || currentImage.includes('/covers/')) {
      continue;
    }
    
    console.log(`Searching: ${title} by ${author}`);
    let coverUrl = await searchCover(title, author);
    
    if (coverUrl) {
      console.log(`  Found: ${coverUrl}`);
      const newBlock = fullBlock.replace(currentImage, coverUrl);
      newContent = newContent.replace(fullBlock, newBlock);
    } else {
      console.log(`  Not found for ${title}`);
      // Use a more reliable placeholder proxy as fallback just in case
      let fallback = `https://placehold.co/400x600/A10D12/D4AF37.png?text=${encodeURIComponent(title.split(' ').join('+'))}`;
      const newBlock = fullBlock.replace(currentImage, fallback);
      newContent = newContent.replace(fullBlock, newBlock);
    }
  }

  fs.writeFileSync(mockDataPath, newContent, 'utf-8');
  console.log('Done mapping URLs to OpenLibrary!');
}

processBooks().catch(console.error);
