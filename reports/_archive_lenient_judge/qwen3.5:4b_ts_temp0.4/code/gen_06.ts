const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=`);
} else {
    const nums: number[] = [];
    for (const s of input.split(',')) {
        if (/^-?\d+$/.test(s.trim())) {
            nums.push(parseInt(s, 10));
        }
    }

    let count = new Set<number>();
    let sum = BigInt(0); // Using BigInt to ensure safety for large sums before conversion back
    const uniqueSet: number[] = [];

    for (const n of nums) {
        if (!uniqueSet.includes(n)) {
            count++;
            uniqueSet.push(n);
            sum += BigInt(n);
        } else {
            // If duplicate, we don't add to sum or count again as per "重複を除いた整数" requirement for both metrics.
            // Wait, re-reading spec: "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
            // This means calculate the count and sum of UNIQUE numbers only. Duplicates are ignored entirely from consideration.
        }
    }

    console.log(`count=${uniqueSet.length} sum=${Number(sum)}`);
}
