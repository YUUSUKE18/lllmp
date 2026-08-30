import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line + '\n';
    });

    rl.on('close', () => {
        if (!input) return;

        // カンマで分割し、各要素を整数に変換しようとする
        const parts = input.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数としてパースを試みる
            const num = parseInt(trimmedPart, 10);

            // 数値として有効であり、かつ重複していないか確認する
            if (!isNaN(num)) {
                // 仕様上、64bit整数に収まることを前提とするため、標準のnumber型で十分だが、
                // 合計を安全に扱うためにBigIntを使う（ただし入力が非常に大きい場合は注意が必要。ここでは数値として処理し、最終合計をBigIntにする）
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた整数から合計を計算する
        let finalSum = 0n;
        for (const num of uniqueNumbers) {
            // 合計は64bit整数の範囲に収まるため、通常の数値として加算しても問題ないが、
            // 最終的な出力形式に合わせてBigIntで管理する。
            finalSum += BigInt(num);
        }

        const count = uniqueNumbers.size;

        // 結果を出力
        console.log(`count=${count} sum=${finalSum.toString()}`);
    });
}

solve();
