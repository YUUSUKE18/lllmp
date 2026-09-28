import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか、そして値が64bit範囲内かを確認（ここでは標準のNumber型で十分）
        if (!isNaN(num)) {
            count++;
            validNumbersFound = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できなかった要素や空要素は無視される。
    // もし入力が完全に空だった場合（partsが空または全て空白）、count=0, maxValue=-Infinityとなるが、
    // 仕様上は「整数として解釈できない要素も無視する」ため、有効な数値のみをカウントする。

    if (validNumbersFound) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 整数が一つもなかった場合（入力が空または非数値のみ）、count=0, maxの扱いは文脈依存だが、
        // 厳密に「要素数と最大値」を求めるため、何も存在しない場合はデフォルト値を設定するか、
        // 入力がない場合の動作を定義する必要がある。ここでは、有効な数値が一つもない場合は count=0, maxは未定義となるが、
        // 通常は入力があったものとして扱うため、もし入力に数字が一つもなかった場合はcount=0, max=0などを設定するのが自然かもしれない。
        // ただし、与えられた制約に従い、有効な数が見つからなかった場合の出力形式を決定する。
        // 多くの競技プログラミングの文脈では、データが存在しない場合は count=0 で終了することが期待される。
        process.stdout.write(`count=0 max=-Infinity\n`); // または count=0 max=0 など、問題の意図によるが、-Infinityで最大値が存在しなかったことを示す。
    }
}

solve();
