const input = process.stdin.read().split('\n');

// Filter out empty lines and trim whitespace
const validLines = input.map(line => line.trim()).filter(line => line.length > 0);

if (validLines.length === 0) {
    console.log('pairs=0\n');
} else {
    const targetStr = validLines[0];
    // Assuming the first line is always a valid integer as per spec "目標値が与えられます"
    const target = BigInt(targetStr);

    const numbers: bigint[] = [];
    for (let i = 1; i < validLines.length; i++) {
        const line = validLines[i];
        try {
            // Try to parse as integer. If it fails, ignore the line.
            numbers.push(BigInt(line));
        } catch (e) {
            // Ignore lines that cannot be interpreted as integers
        }
    }

    const count = 0n;
    const seen = new Map<bigint, bigint>();

    for (const num of numbers) {
        const complement = target - num;
        if (seen.has(complement)) {
            count += seen.get(complement);
        }
        seen.set(num, (seen.get(num) ?? 0n) + 1n);
    }

    console.log(`pairs=${count}\n`);
}
