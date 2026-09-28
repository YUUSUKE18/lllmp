const input = process.stdin.read().trim();

if (!input) {
    console.log('count=0 sum=0');
} else {
    const parts = input.split(',');
    const uniqueNumbers = new Set<BigInt>();

    for (const part of parts) {
        const trimmed = part.trim();
        if (!trimmed) continue;

        // Check if the string represents a valid integer
        if (/^-?\d+$/.test(trimmed)) {
            uniqueNumbers.add(BigInt(trimmed));
        }
    }

    const count = uniqueNumbers.size;
    let sum = 0n;

    for (const num of uniqueNumbers) {
        sum += num;
    }

    console.log(`count=${count} sum=${sum}`);
}
