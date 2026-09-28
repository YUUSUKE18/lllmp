const input = process.stdin.read().trim();
if (!input) {
    console.log(`count=0 sum=`);
} else {
    const parts = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (parts.length === 0) {
        console.log(`count=0 sum=`);
    } else {
        const counts: Map<number, number> = new Map();
        let totalSum: bigint = BigInt(0);

        for (const num of parts) {
            const key = String(num); // 使用して重複を除くために文字列に変換する必要がある。なぜなら、Number の精度の問題や整数の解釈の違いがあるかもしれないからだ。しかし、仕様は「64bit integer」なので、JavaScript の Number は安全であるはずだ。ただし、BigInt を使用することでより確実に処理できる。
            counts.set(num, (counts.get(num) || 0) + 1);
        }

        for (const num of parts) {
            totalSum += BigInt(num);
        }

        const count = Object.keys(counts).length;
        console.log(`count=${count} sum=${totalSum}`);
    }
}
