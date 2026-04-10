const fs = require('fs');
const path = require('path');

const challengesDir = path.join(__dirname, 'public', 'challenges');

function updateStyles(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            const stylePath = path.join(fullPath, 'style.css');
            if (fs.existsSync(stylePath)) {
                let content = fs.readFileSync(stylePath, 'utf8');
                
                // Add GPU acceleration and background to body or main container
                // We'll target the body and any .container or .card
                if (!content.includes('transform: translateZ(0)')) {
                    content = content.replace(/body\s*{([^}]*)}/, (match, p1) => {
                        return `body {${p1}\n    background-color: #0a0e17 !important;\n    transform: translateZ(0);\n    backface-visibility: hidden;\n}`;
                    });
                    
                    // Also target common container classes
                    content = content.replace(/\.container\s*{([^}]*)}/g, (match, p1) => {
                        return `.container {${p1}\n    transform: translateZ(0);\n    backface-visibility: hidden;\n}`;
                    });
                    
                    content = content.replace(/\.card\s*{([^}]*)}/g, (match, p1) => {
                        return `.card {${p1}\n    transform: translateZ(0);\n    backface-visibility: hidden;\n}`;
                    });

                    // Update palette for realism (Levels 21-80)
                    const challengeId = parseInt(item);
                    if (challengeId >= 21) {
                        content = content.replace(/--brand-secondary:\s*[^;]+;/, '--brand-secondary: #0f172a;');
                        content = content.replace(/--ui-bg:\s*[^;]+;/, '--ui-bg: #0a0e17;');
                        content = content.replace(/--ui-text:\s*[^;]+;/, '--ui-text: #f8fafc;');
                        content = content.replace(/--ui-muted:\s*[^;]+;/, '--ui-muted: #94a3b8;');
                        content = content.replace(/--ui-border:\s*[^;]+;/, '--ui-border: #1e293b;');
                    }
                    
                    fs.writeFileSync(stylePath, content);
                    console.log(`Updated ${stylePath}`);
                }
            }
        }
    });
}

updateStyles(challengesDir);
