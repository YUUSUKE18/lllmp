import * as fs from 'fs';

const input = fs.readFileSync(0, { encoding: 'utf8' }).trim();
if (!input) process.exit(0);

const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(v => !isNaN(v));

const uniqueCountSet = new Set<number>();

for (let v of parts) {
    if (!(uniqueCountSet.has(v))) {
        uniqueCountSet.add(v);
    } else {
        // Count how many times this value appears in the array to get count
        let c: number = 0;
        for(let i=0;i<parts.length;i++)if(parts[i]==v)c++;

        let sum:number=c*v;
        
        if(!sum)continue;

console.log(`count=${c} sum=${sum}`);
    } else {
        // Already counted, skip
    } 
} 

// Corrected logic for counting and summing unique elements properly:
const counts = new Map<number, number>();
for (let v of parts) {
    if (!counts.has(v)) counts.set(v, 0);
    counts.set(v, counts.get(v)! + 1);
}

console.log(`count=${counts.size}`);
