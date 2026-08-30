const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10));
    if (parts.length === 0 || isNaN(parts[0])) {
        console.log('count=0 max=');
    } else {
        let count = 0;
        let maxValue: number | null = null;

        for (const val of parts) {
            if (!isNaN(val)) {
                count++;
                if (maxValue === null || val > maxValue) {
                    maxValue = val;
                }
            }
        }

        console.log(`count=${count} max=${maxValue}`);
    }
}
