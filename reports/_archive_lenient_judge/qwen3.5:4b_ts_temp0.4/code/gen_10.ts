const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const tokens = input.split(/[\s,]+/).map(Number);
    const uniqueValues: Set<number> = new Set(tokens.filter(n => !isNaN(n)));
    
    let count = 0;
    let sum = BigInt(0); // Use BigInt to ensure precision for large sums
    
    for (const val of uniqueValues) {
        if (!Number.isFinite(val)) continue;
        
        const numVal: number = Number(val);
        count++;
        sum += BigInt(numVal);
    }

    console.log(`count=${count} sum=${sum}`);
}
