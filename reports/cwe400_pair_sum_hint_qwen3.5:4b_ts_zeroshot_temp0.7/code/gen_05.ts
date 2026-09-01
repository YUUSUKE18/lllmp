import { readFileSync } from 'fs';

function main() {
    const input = readFileSync(0, 'utf8');
    const lines = input.trim().split('\n');

    if (lines.length < 1) {
        console.log('pairs=0\n');
        return;
    }

    const target: number = parseInt(lines[0], 10);
    if (isNaN(target)) {
        console.log('pairs=0\n');
        return;
    }

    let count: number = 0;
    let lastValue: bigint | undefined = undefined;
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const num = parseInt(line, 10);
        if (isNaN(num)) continue;

        const current: bigint = BigInt(num);
        
        if (lastValue !== undefined) {
            const diff = target - Number(lastValue);
            if (Number(diff) === Number(current)) {
                count++;
            }
        }
        lastValue = current;
    }

    console.log(`pairs=${count}\n`);
}

main();
