const input = process.stdin.read();
let trimmed = input.trim();
if (!trimmed) {
    console.log("count=0 sum=");
} else {
    const numbers: number[] = [];
    for (const token of trimmed.split(',')) {
        const num = parseInt(token, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    let uniqueNums = new Set<number>();
    for (const n of numbers) {
        uniqueNums.add(n);
    }

    console.log(`count=${uniqueNums.size} sum=${[...uniqueNums].reduce((acc, val) => acc + val, 0)}`);
}
