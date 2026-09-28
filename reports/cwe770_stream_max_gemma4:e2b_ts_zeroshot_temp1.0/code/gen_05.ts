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

        // カンマで分割し、各要素を整数に変換しようとする
        const parts = input.trim().split(',');
        
        let count = 0;
        let maxValue = -Infinity;
        let isValidInput = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') {
                continue; // 空の要素は無視
            }

            // 整数として解釈できるか試みる
            const num = Number(trimmedPart);
            
            // isFiniteで数値であり、かつ整数（または浮動小数点数だが、ここでは整数を想定）であるかチェックする。
            // 問題文では「整数列」とあるため、厳密に整数のみを対象とする。
            if (Number.isInteger(num) && num >= -2**63 && num <= 2**63 - 1) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValidInput = true;
            }
        }

        // 有効な整数のみをカウントしているか確認。少なくとも一つ有効な要素があった場合。
        if (count > 0) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 有効な整数が一つもなかった場合は何も出力しない（仕様に明記はないが、安全策として）
            // ただし、入力が空または非数値のみの場合も考えられるため、ここでは0と-Infinityなどを出力しない。
        }
    });
}

solve();
