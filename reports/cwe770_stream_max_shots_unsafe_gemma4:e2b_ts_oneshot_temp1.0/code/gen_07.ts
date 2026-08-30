import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白を無視して整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 空文字列や空白のみの要素をスキップ（ここではカンマ区切りなので、要素自体が空でないか確認）
        if (part.trim() === "") continue;

        const num = parseInt(part.trim(), 10);

        // 整数として解釈できるか確認
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントに含める必要があるため、
    // ここでは「カンマ区切りの文字列の数」ではなく、「有効な整数」の数をカウントする。
    // 仕様に基づき、読み込んだデータの中から有効な整数のみを考慮してcountとmaxValueを決定する。

    let finalCount = 0;
    let finalMaxValue = -Infinity;
    
    // 再度処理し、全ての要素から数と最大値を求める（より厳密に）
    const numbers = [];
    for (const part of parts) {
        if (part.trim() !== "") {
            const num = parseInt(part.trim(), 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    if (numbers.length > 0) {
        finalCount = numbers.length;
        finalMaxValue = Math.max(...numbers);
    } else {
        // 有効な整数が一つもない場合、count=0, maxをどうするか。
        // 例えば、要素数が0で最大値は定義されない（ここでは-1や0などを仮定する必要があるが、
        // 最小の制約がないため、実質的にゼロ件として扱う）
        finalCount = 0;
        finalMaxValue = 0; // 数が一つもない場合の安全策として0とする
    }


    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
