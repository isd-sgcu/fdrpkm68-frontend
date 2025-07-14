import fs from 'fs';
import path from 'path';

// Read CSV file with UTF-8 encoding
const csvPath = path.join(process.cwd(), 'public', 'fest', 'fest_quest2_shop_list_4.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV content with proper handling of quoted fields
function parseCSV(content: string) {
  // Handle different line endings (Windows \r\n, Unix \n, Mac \r)
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  
  if (lines.length === 0) return [];
  
  // Parse headers
  const headers = parseCSVLine(lines[0]);
  const shops = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = parseCSVLine(line);
    
    if (values.length >= 3) { // At least have number, name, zone
      const shop: any = {};
      headers.forEach((header, index) => {
        const value = values[index] || '';
        shop[header.trim()] = value.trim();
        if(header === 'image'){
          shop[header] = convertGoogleDriveUrl(value.trim())
        }
      });
      
      // Only add shops that have a name and zone
      if (shop.name && shop.zone) {
        shops.push(shop);
      }
    }
  }
  return shops;
}

// Helper function to parse a single CSV line handling quoted fields
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Handle escaped quotes inside quoted field
        current += '"';
        i += 2;
        continue;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
    i++;
  }
  
  // Push the last field
  result.push(current);
  
  return result;
}


// Helper function to convert Google Drive share links to direct image URLs
function convertGoogleDriveUrl(url: string): string {
  console.log('Original URL:', url);
  
  if (!url) return '';
  
  // Match Google Drive URLs and extract file ID
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  
  if (match && match[1]) {
    // Try multiple formats for better compatibility
    const fileId = match[1];
    
    // Format 1: Standard thumbnail (works best for public images)
    const directUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
    
    console.log('Converted URL:', directUrl);
    return directUrl;
  }

  console.log('Not a Google Drive URL, returning original:', url);
  return url; // Return original URL if it's not a Google Drive URL
}

const allShops = parseCSV(csvContent);
export const zoneAShops = allShops.filter(shop => shop.zone === 'A');
export const zoneBShops = allShops.filter(shop => shop.zone === 'B');
export const zoneCShops = allShops.filter(shop => shop.zone === 'C');
export const zoneDShops = allShops.filter(shop => shop.zone === 'D');