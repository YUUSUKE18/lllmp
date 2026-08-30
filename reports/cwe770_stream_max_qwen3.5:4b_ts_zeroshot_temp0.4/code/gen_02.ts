import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (input.length === 0) {
    console.log('count=0 max=');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(Number.isInteger(parseInt(s.trim()))));
    
    if (parts.length > 0) {
        const count = parts.length;
        let maxVal: number | undefined;

        for (const val of parts) {
            if (!maxVal || val > maxVal) {
                maxVal = val;
            }
        }

        console.log(`count=${count} max=${maxVal}`);
    } else {
        console.log('count=0 max=');
    }
}
