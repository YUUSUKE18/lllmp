const input = process.stdin.read();
if (!input) {
    console.log('pairs=0');
} else {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l !== '');
    let targetVal: bigint | undefined;
    const nums: string[] = [];

    for (const line of lines) {
        if (/^-?\d+$/.test(line)) {
            const val = BigInt(line);
            if (!targetVal) {
                targetVal = val;
            } else {
                nums.push(val.toString());
            }
        }
    }

    if (!targetVal || nums.length === 0) {
        console.log('pairs=0');
    } else {
        const target = targetVal;
        const freqMap = new Map<string, bigint>();
        let pairsCount = 0n;

        for (const numStr of nums) {
            const num = BigInt(numStr);
            const needed = target - num;

            const neededCount = freqMap.get(needed.toString()) || 0n;
            pairsCount += neededCount;

            const currentCount = freqMap.get(num.toString()) || 0n;
            freqMap.set(num.toString(), (currentCount + 1n));
        }

        console.log(`pairs=${pairsCount}`);
    }
}
