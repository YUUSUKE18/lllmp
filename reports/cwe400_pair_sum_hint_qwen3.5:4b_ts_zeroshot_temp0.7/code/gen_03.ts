import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.trim().split('\n');

if (lines.length === 0) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(lines[0], 10);
if (isNaN(target)) {
    console.log('pairs=0\n');
    process.exit(0);
}

let count = 0;
for (let i = 2; i <= lines.length - 1; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
        const val = parseInt(line, 10);
        if (isNaN(val)) continue;
        
        for (let j = i + 1; j <= lines.length - 1; j++) {
            const line2 = lines[j].trim();
            if (!line2) continue;
            
            try {
                const val2 = parseInt(line2, 10);
                if (isNaN(val2)) continue;
                
                if (val + val2 === target) {
                    count++;
                }
            } catch {}
        }
    } catch {}
}

console.log(`pairs=${count}\n`);
