import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    if (line.trim() === '') return;

    const numbersStr = line.trim().split(',');
    let numbers: number[] = [];

    for (const numStr of numbersStr) {
        if (numStr) {
            const num = parseInt(numStr.trim(), 10);
            // 整数として解釈でき、かつ有効な数値であることを確認（NaNでないこと）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を取得
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    const count = uniqueNumbers.length;
    let sum: bigint = 0n; // 64bit整数として扱うためBigIntを使用

    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
});

rl.on('close', () => {
    // 全ての入力が処理された後、ここで終了する（この問題設定ではlineイベント内で出力するため、ここでは特に何もしない）
});
