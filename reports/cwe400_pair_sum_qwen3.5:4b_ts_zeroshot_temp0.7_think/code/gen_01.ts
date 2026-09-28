const rawInput = process.stdin.read();
if (!rawInput) {
    console.log('pairs=0');
} else {
    const lines = rawInput.split('\n').map(l => l.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log('pairs=0');
    } else {
        const target = BigInt(lines[0]);
        const countMap: Map<bigint, bigint> = new Map();
        let ans = 0n;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            try {
                const num = BigInt(line);
                const complement = target - num;

                if (countMap.has(complement)) {
                    ans += countMap.get(complement)!;
                }
                countMap.set(num, (countMap.get(num) || 0n) + 1n);
            } catch {
                // Ignore non-integer lines
            }
        }

        console.log(`pairs=${ans}`);
    }
}
