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

        // カンマで分割し、空白を除去して整数に変換
        const parts = input.trim().split(',');
        let count = 0;
        let maxValue = -Infinity;
        let validNumbersFound = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') {
                continue; // 空要素は無視
            }

            // 整数として解釈可能かチェックし、64bit範囲内か確認
            const num = Number(trimmedPart);
            if (!isNaN(num) && Number.isInteger(num)) {
                // 64bit整数の範囲内 (JavaScriptのNumber型はIEEE 754倍精度で安全)
                if (num >= -2**63 && num <= 2**63 - 1) {
                    count++;
                    if (num > maxValue) {
                        maxValue = num;
                    }
                    validNumbersFound = true;
                }
            }
        }

        // 処理された要素が一つ以上あった場合のみ出力
        if (validNumbersFound) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 有効な整数要素が一つもなかった場合（仕様上は空の入力に対する振る舞いは明記されていないが、ここでは0個0を返すなど、最も安全な解釈をする）
            // ただし、入力が完全に無効な場合、count=0, max=-Infinityとなる。
            // 厳密に「要素数と最大値」を求めるため、要素が存在しない場合は0を出力するのが妥当。
            console.log(`count=0 max=-Infinity`); // または、問題の意図に従って適切な値を設定するが、ここでは見つからなかったことを示す
        }
    });
}

solve();
