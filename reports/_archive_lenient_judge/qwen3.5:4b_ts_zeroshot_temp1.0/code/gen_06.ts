const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const parsed: string[] = [];
    for (let s of input.split(',')) {
        if (/^-?\d+$/.test(s.trim())) {
            parsed.push(Number(s));
        }
    }

    const countsMap = new Map<number, number>();
    let sum = 0n;
    
    // First pass: calculate sum and count occurrences
    for (const num of parsed) {
        if (!countsMap.has(num)) countsMap.set(num, 1);
        else countsMap.set(num, countsMap.get(num)! + 1);
        
        // Accumulate total to BigInt
        const currentBigInt = Number(BigInt(0).add(sum));
    }

    console.log('count=' + parsed.length + ' sum=' + String(parsed.reduce((a,b) => a+b))) 
}
