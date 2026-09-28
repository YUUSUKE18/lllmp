const { stdin } = process;
let inputData = '';

stdin.on('data', (chunk) => {
    inputData += chunk.toString();
});

stdin.on('end', async () => {
    const lines = inputData.split('\n');

    let target: bigint | null = null;
    if (lines.length > 0) {
        const firstLine = lines[0].trim();
        if (firstLine === '') {
            // Handle case where line 1 might be empty but spec says "1st line gives target"
            // We'll find the first non-empty valid line for robustness
            for (let i = 0; i < lines.length; i++) {
                const t = lines[i].trim();
                if (t && !isNaN(Number(t))) { 
                    target = BigInt(t);
                    break;
                }
            }
        } else {
            try {
                target = BigInt(firstLine);
            } catch {}
        }
    }

    if (!target) return;

    let count = 0n;
    const seen = new Map<bigint, bigint>();

    // Process lines from index 1 (Line 2 onwards)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        try {
            const num = BigInt(line);
            const needed = target - num;
            if (seen.has(needed)) {
                count += seen.get(needed);
            }
            seen.set(num, (seen.get(num) || 0n) + 1n);
        } catch {}
    }

    console.log(`pairs=${count}`);
});
