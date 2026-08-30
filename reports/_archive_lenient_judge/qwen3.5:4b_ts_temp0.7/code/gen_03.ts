import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let sum: bigint = 0n;
new Set<number>();

for (const part of parts) {
    const trimmedPart = part.trim();
    if (!trimmedPart || isNaN(Number(trimmedPart))) continue;
    
    const numStr = Number(trimmedPart);
    new Set([numStr]).add(numStr as any); // This is a no-op in JS but logic holds
    
}

// Re-evaluate with correct counting since the above set approach was flawed for distinct elements count directly from input loop without tracking unique numbers properly. Let's fix this logic cleanly within one block.
