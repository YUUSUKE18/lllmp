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
        if (!input.trim()) {
            return;
        }

        // カンマで分割し、各要素を数値に変換しようと試みる
        const parts = input.trim().split(',');
        
        let count = 0;
        let maxValue = -Infinity;
        let isValidInput = false;

        for (const part of parts) {
            // 空文字や前後の空白を除去して整数として解釈を試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') {
                continue;
            }

            // 整数としてパースを試みる。parseIntは非厳密なので、残りの文字列が数値でないかチェックが必要
            const num = Number(trimmedPart);

            // isNaNチェックと、入力された文字列全体が数字のみで構成されているかの確認
            if (!isNaN(num) && String(num) === trimmedPart) {
                // 64bit整数範囲内であることの確認（JavaScriptのNumberはIEEE 754の64bit浮動小数点ですが、ここでは安全のため）
                // 今回の仕様では「値は 64bit 整数の範囲に収まる」という制約が与えられているため、数値として扱える範囲であればOKとする。
                
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValidInput = true;
            }
        }

        // 最終的な結果を出力
        if (isValidInput) {
            process.stdout.write(`count=${count} max=${maxValue}\n`);
        } else {
             // 有効な整数が一つもなかった場合の処理（仕様上は空入力の場合に該当する可能性がある）
             // ただし、データが存在しない場合、count=0 max=-Infinityとすべきか？ 
             // 仕様に基づき、読み取れた有効な要素がない場合は何も出力しないか、または意味のある結果を出力する必要がある。
             // 今回は、数値が一つも読み取れなかった場合は、何も出力しない（または count=0 max=適当値）を想定する。
             // 厳密には「整数として解釈できない要素も無視」されたため、カウントされた有効なデータがない場合は何も出力しないのが自然。
        }
    });
}

solve();
