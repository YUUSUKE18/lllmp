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

        // カンマで分割し、空白を除去して整数に変換する
        const parts = input.trim().split(',');
        let count = 0;
        let maxValue = -Infinity;
        let isValidInput = false;

        for (const part of parts) {
            if (part.trim() === '') continue;

            // 整数として解釈可能かチェックし、64bit範囲内か確認する
            const num = Number(part);
            if (!isNaN(num) && Number.isInteger(num) && num >= -2**63 && num <= 2**63 - 1) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValidInput = true;
            }
        }

        // 空要素や非整数は無視されるため、countとmaxValueが正しく計算されているか確認する。
        // 仕様上、入力されたカンマ区切りの値すべてを考慮し、有効な整数のみをカウントする必要がある。
        // ここでは「カンマ区切りの整数列」を受け取るとあるため、入力された文字列から抽出した有効な整数の数と最大値を求める。

        if (count > 0) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 有効な整数が一つもなかった場合（例: 空行のみ）の処理。
            // このケースでは、要素数と最大値を求めることができないため、仕様に厳密に従う。
            // 少なくとも0個の要素と、最大値の定義が問題となるが、ここでは入力された有効な整数が存在しない場合は何も出力しないか、または0を出力する。
            // 最も安全なのは、抽出できたものに基づいて出力すること。
            // count=0, max=-Infinity は不適切かもしれないため、count=0 の場合は最大値の出力を省略するか、あるいは入力が空の場合は何もしないとする。
        }
    });
}

solve();
