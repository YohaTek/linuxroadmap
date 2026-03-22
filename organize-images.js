// Script to organize Linux learning images
// This will help categorize and rename images for better integration

const fs = require('fs');
const path = require('path');

// Common Linux topics that images might cover
const topics = {
  'navigation': ['ls', 'cd', 'pwd', 'directory', 'file', 'tree', 'find'],
  'permissions': ['chmod', 'chown', 'permissions', 'ownership', 'access'],
  'processes': ['ps', 'top', 'htop', 'kill', 'process', 'cpu', 'memory'],
  'networking': ['ip', 'ping', 'netstat', 'ssh', 'firewall', 'network'],
  'filesystem': ['mount', 'df', 'du', 'disk', 'partition', 'filesystem'],
  'system': ['systemctl', 'service', 'daemon', 'boot', 'init'],
  'text': ['grep', 'awk', 'sed', 'vim', 'nano', 'text', 'editor'],
  'package': ['apt', 'yum', 'dnf', 'package', 'install', 'repository'],
  'scripting': ['bash', 'script', 'shell', 'function', 'loop'],
  'containers': ['docker', 'container', 'image', 'compose'],
  'monitoring': ['logs', 'journal', 'monitoring', 'uptime', 'load']
};

// Function to suggest new names based on content analysis
function suggestNewName(filename, index) {
  // Since we can't analyze image content directly, we'll use a systematic approach
  const baseName = `linux-topic-${String(index + 1).padStart(2, '0')}`;
  return `${baseName}.jpg`;
}

// Generate mapping file for manual review
function generateMapping() {
  const imagesDir = path.join(__dirname, 'images');
  const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(jpg|jpeg)$/i));
  
  const mapping = files.map((file, index) => ({
    original: file,
    suggested: suggestNewName(file, index),
    topic: 'general', // To be manually categorized
    description: 'Linux learning image - needs manual categorization'
  }));
  
  fs.writeFileSync('image-mapping.json', JSON.stringify(mapping, null, 2));
  console.log(`Generated mapping for ${files.length} images`);
  console.log('Review image-mapping.json and update topic/description fields');
}

generateMapping();

