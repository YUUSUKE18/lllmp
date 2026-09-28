const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10));
    let count = 0;
    let max: number | null = null;

    for (const n of parts) {
        if (!isNaN(n)) {
            count++;
            if (max === null || n > max) {
                max = n;
            }
        }
    }

    console.log(`count=${count} ${max !== null ? `max=${max}` : 'max='}`);
}
