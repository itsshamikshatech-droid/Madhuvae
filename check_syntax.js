import fs from 'fs';

const filesToCheck = [
  'src/App.jsx',
  'src/pages/AdminPortal.jsx',
  'src/pages/LoginUser.jsx',
  'src/pages/OTP.jsx',
  'src/services/auth.js',
  'src/services/firebase.js',
  'src/services/firestore.js'
];

filesToCheck.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const b = (content.match(/\{/g) || []).length;
    const b2 = (content.match(/\}/g) || []).length;
    const p = (content.match(/\(/g) || []).length;
    const p2 = (content.match(/\)/g) || []).length;
    const s = (content.match(/\[/g) || []).length;
    const s2 = (content.match(/\]/g) || []).length;
    
    if (b !== b2 || p !== p2 || s !== s2) {
        console.log(`Mismatch in ${file}: Braces ${b}/${b2}, Parens ${p}/${p2}, Brackets ${s}/${s2}`);
    } else {
        console.log(`OK: ${file}`);
    }
  } catch (err) {
    console.error(`Error reading ${file}: ${err.message}`);
  }
});
