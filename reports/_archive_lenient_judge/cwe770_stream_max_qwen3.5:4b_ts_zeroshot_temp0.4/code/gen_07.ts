import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const parts = input.split(',');
    let count = 0;
    let maxValue: number | null = null;

    for (const part of parts) {
        if (!part.trim()) continue;
        
        try {
            const num = parseInt(part, 10);
            if (Number.isNaN(num)) continue;
            
            count++;
            if (maxValue === null || num > maxValue) {
                maxValue = num;
            }
        } catch {
            // Ignore non-integer elements that fail parsing logic beyond NaN check or range issues implicitly handled by Number type in JS for safe integers, but spec says ignore uninterpretable. parseInt handles most cases, if it returns NaN we skip.
        }
    }

    console.log(`count=${count} max=${maxValue}`);
}
