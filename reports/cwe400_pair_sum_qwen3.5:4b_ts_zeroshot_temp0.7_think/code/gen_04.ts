const readInput = async (): Promise<string> => {
    const data = '';
    process.stdin.setEncoding('utf8');
    return new Promise((resolve, reject) => {
        process.stdin.on('data', (chunk) => { data += chunk; });
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', reject);
    });
};

async function main() {
    const input = await readInput();
    const lines = input.split('\n');
    const validLines: string[] = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length > 0) {
            validLines.push(trimmed);
        }
    }

    if (validLines.length === 0) {
        console.log('pairs=0');
        return;
    }

    const target = BigInt(validLines[0]);
    
    const nums: bigint[] = [];
    for (let i = 1; i < validLines.length; i++) {
        const line = validLines[i];
        try {
            nums.push(BigInt(line));
        } catch (e) {
            // Ignore invalid integer lines
        }
    }

    let count = 0n;
    const freqMap = new Map<bigint, bigint>();

    for (const num of nums) {
        const complement = target - num;
        if (freqMap.has(complement)) {
            count += freqMap.get(complement)!;
        }
        const currentCount = freqMap.get(num) ?? 0n;
        freqMap.set(num, currentCount + 1n);
    }

    console.log(`pairs=${count}`);
}

main();
