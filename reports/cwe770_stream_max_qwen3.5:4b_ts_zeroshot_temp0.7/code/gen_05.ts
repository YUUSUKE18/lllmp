const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=');
} else {
    const tokens: string[] = input.split(',').map(s => s.trim());
    let count = 0;
    let maxValue: number | null = null;

    for (const token of tokens) {
        if (!token || isNaN(Number(token))) continue;
        
        const num = Number(token);
        if (maxValue === null || num > maxValue) {
            maxValue = num;
        }
        count++;
    }

    console.log(`count=${count} max=${maxValue}`);
}
