import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';
    input.on('data', (chunk) => {
        data += chunk;
    });

    input.on('end', () => {
        // 入力文字列をカンマで分割し、各要素を整数に変換する
        const parts = data.trim().split(',');

        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 空白や非数値を無視して処理する
            const trimmedPart = part.trim();
            if (trimmedPart === '') {
                continue;
            }

            // 整数として解釈できるかチェックし、変換する
            const num = parseInt(trimmedPart, 10);
            if (!isNaN(num)) {
                // 問題の制約に従い、64bit整数として扱う（JavaScriptのNumber型はIEEE 754倍精度だが、
                // ここでは大きな合計を扱うためBigIntを使用する）

                // 重複を除いた整数としてSetに追加
                uniqueNumbers.add(num);
            }
        }

        // 重複を除いた整数の個数を計算
        const count = uniqueNumbers.size;

        // 合計を計算 (Setの内容に基づいて合計を再計算する)
        uniqueNumbers.forEach(num => {
            sum += BigInt(num);
        });

        // 結果を出力
        process.stdout.write(`count=${count} sum=${sum}\n`);
    });
}

solve();
