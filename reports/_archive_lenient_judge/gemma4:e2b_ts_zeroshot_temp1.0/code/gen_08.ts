import * as process from 'process';

function solve() {
    const input = process.stdin.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換してフィルタリング
    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => parseInt(s, 10))
        .filter(n => !isNaN(n));

    // 重複を除いた整数のみを抽出
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、BigIntで計算

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
