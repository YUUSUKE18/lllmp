const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=0');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (parts.length === 0) {
        console.log('count=0 sum=0');
    } else {
        const uniqueSet = new Set(parts);
        let count = uniqueSet.size;
        let sum = 0n; // Use BigInt to ensure precision, though spec says fits in 64-bit
        
        for (const num of parts) {
            if (!isNaN(num)) {
                sum += Number(num);
            }
        }

        console.log(`count=${uniqueSet.size} sum=${sum}`);
    }
}
