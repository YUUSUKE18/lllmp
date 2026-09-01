const fs = require('fs');

function main() {
    const input = fs.readSync();
    let lines = input.trim().split('\n');
    
    // 目標値を取得 (1 行目)
    if (lines.length > 0) {
        const target = parseInt(lines[0].trim(), 10);
        // 2 行目以降の整数を収集
        const numbers: number[] = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === '') continue;
            try {
                const num = parseInt(line, 10);
                if (!isNaN(num)) {
                    numbers.push(num);
                }
            } catch (e) {
                // 整数として解釈できない行は無視
            }
        }

        let count = 0n;
        
        // 64bit 整数の範囲内なので、Number.MAX_SAFE_INTEGER を超える可能性があるため BigInt を使用
        for (let i = 0n; i < numbers.length; i++) {
            const val1 = BigInt(numbers[i]);
            for (let j = i + 1n; j < numbers.length; j++) {
                const val2 = BigInt(numbers[j]);
                if (val1 + val2 === target) {
                    count++;
                }
            }
        }

        console.log(`pairs=${count}`);
    } else {
        // 目標値がない場合（空または無効な入力）は出力しないか、またはデフォルトを返す。
        // 仕様上「目標値が与えられます」とあるので、通常は存在すると想定。
        // もし何も得られない場合は特に何もしない。
    }
}

main();
