const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (parts.length === 0) {
        console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
    } else {
        const count = parts.length;
        let maxVal = parts[0];
        for (let i = 1; i < parts.length; i++) {
            if (parts[i] > maxVal) {
                maxVal = parts[i];
            }
        }
        console.log('count=' + count + ' max=' + maxVal);
    }
}
