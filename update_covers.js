import fs from 'fs';
import path from 'path';

// Helper to download an image using Node's native fetch
async function downloadImage(url, filepath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

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
  
  // Create covers directory
  const coversDir = path.join(process.cwd(), 'public', 'covers');
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  // Extract ITEMS array with a simple regex
  const itemsRegex = /export const ITEMS = \[([\s\S]*?)\];/;
  const match = content.match(itemsRegex);
  
  if (!match) {
    console.error('Could not find ITEMS array');
    return;
  }

  const itemsContent = match[1];
  const itemsLineRegex = /{([^}]+)}/g;
  let itemsMatches = [...itemsContent.matchAll(itemsLineRegex)];
  
  let newContent = content;

  for (const itemMatch of itemsMatches) {
    const itemBlock = itemMatch[0];
    
    // Extract ID, Title, Author
    const idMatch = itemBlock.match(/id:\s*(\d+)/);
    const titleMatch = itemBlock.match(/title:\s*'([^']+)'/);
    const authorMatch = itemBlock.match(/author:\s*'([^']+)'/);
    
    if (idMatch && titleMatch && authorMatch) {
      const id = idMatch[1];
      const title = titleMatch[1];
      const author = authorMatch[1];
      const filepath = path.join(coversDir, `${id}.jpg`);
      
      console.log(`Processing: ${title} by ${author}`);
      
      let coverUrl = await searchCover(title, author);
      
      if (!coverUrl) {
        console.log(`  No cover found on OL for ${title}, using fallback pattern`);
        coverUrl = `https://placehold.co/400x600/1E1E1E/D4AF37.jpg?text=${encodeURIComponent(title.split(' ').join('+'))}`;
      }
      
      console.log(`  Downloading: ${coverUrl}`);
      try {
        await downloadImage(coverUrl, filepath);
        
        // Update mockData.js content directly using string replacement
        const imgRegex = /image:\s*'[^']+'/g;
        const newBlock = itemBlock.replace(imgRegex, `image: '/covers/${id}.jpg'`);
        newContent = newContent.replace(itemBlock, newBlock);
        
      } catch (e) {
        console.error(`  Error downloading ${coverUrl}: ${e.message}`);
      }
    }
  }

  fs.writeFileSync(mockDataPath, newContent, 'utf-8');
  console.log('Done!');
}

processBooks().catch(console.error);
