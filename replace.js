const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Darker gradient on the previously applied gradients
    content = content.replace(/from-purple-500 to-orange-500/g, 'from-purple-700 to-orange-600');
    content = content.replace(/from-purple-600 to-orange-600/g, 'from-purple-800 to-orange-700');

    // Grays to gradient text or purple/orange hues
    content = content.replace(/text-gray-500/g, 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500');
    content = content.replace(/text-gray-400/g, 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400');
    content = content.replace(/text-gray-300/g, 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300');
    
    // Replace gray backgrounds with dark purple
    content = content.replace(/bg-gray-200/g, 'bg-purple-900');
    
    // Borders
    content = content.replace(/border-white\/10/g, 'border-purple-700/30');
    content = content.replace(/border-white\/15/g, 'border-purple-700/40');
    content = content.replace(/border-white\/20/g, 'border-purple-700/50');
    content = content.replace(/border-white\/40/g, 'border-purple-600/50');
    content = content.replace(/border-white/g, 'border-purple-700');

    // Backgrounds with opacity
    content = content.replace(/bg-white\/5/g, 'bg-purple-900/20');
    content = content.replace(/bg-white\/10/g, 'bg-purple-900/30');

    // Hero Beams color
    content = content.replace(/lightColor="#ffffff"/g, 'lightColor="#7e22ce"');
    content = content.replace(/via-white/g, 'via-orange-600');
    content = content.replace(/bg-white\/10/g, 'bg-purple-900/40');

    // Miscellaneous text-white to purple tint, unless it's just text-white
    // The user said "todos os elementos que estao cinza, ou preto e branco"
    // I won't replace all "text-white", but I will replace "hover:text-white"
    content = content.replace(/hover:text-white/g, 'hover:text-orange-200');
    content = content.replace(/text-white\/60/g, 'text-purple-300/60');

    // Hover background white to gradient
    content = content.replace(/hover:bg-white/g, 'hover:bg-gradient-to-r hover:from-purple-700 hover:to-orange-600');
    
    // Selection color in layout
    content = content.replace(/selection:bg-purple-500/g, 'selection:bg-purple-700');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated: ' + filePath);
    }
  }
});
