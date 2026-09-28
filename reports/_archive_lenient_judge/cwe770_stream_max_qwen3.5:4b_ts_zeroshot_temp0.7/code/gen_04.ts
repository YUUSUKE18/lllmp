import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const parts = input.split(',');
    
    let count = 0;
    let maxValue: number | null = null;

    for (const part of parts) {
        const trimmedPart = part.trim();
        
        if (!trimmedPart || !/^-?\d+$/.test(trimmedPart)) continue;

        try {
            const num = Number.parseInt(trimmedPart, 10);
            
            if (count === 0) {
                maxValue = num;
            } else {
                if (num > maxValue) {
                    maxValue = num;
                }
            }
            count++;
        } catch {
            continue;
        }
    }

    console.log('count=' + count + ' max=' + (maxValue ?? Number.MIN_SAFE_INTEGER));
}
