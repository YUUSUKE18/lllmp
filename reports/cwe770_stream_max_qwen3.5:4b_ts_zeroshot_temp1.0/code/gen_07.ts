const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const parts = input.split(',').map(x => parseInt(x.trim(), 10)).filter(v => !isNaN(v));
    if (parts.length === 0) {
        console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
    } else {
        const count = parts.length;
        let maxValue = parts[0];
        for (let i = 1; i < parts.length; i++) {
            if (parts[i] > maxValue) {
                maxValue = parts[i];
            }
        }
        console.log('count=' + count + ' max=' + maxValue);
    }
}
