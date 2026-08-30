import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白や空文字列を無視するためにトリムする
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか、かつ有効な値であるかを確認する
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 有効な要素が存在する場合のみ結果を出力する（仕様上は常にカウントと最大値を求めるが、空入力の場合を考慮）
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 入力が完全に無効な場合（例: "," や "  " のみ）、通常は count=0 max=-Infinity または適切な値を出力する。
        // ここでは、入力された整数がない場合は、最大値が存在しないことを示すために、最小の64bit整数を扱うため -Infinity をそのまま使うか、あるいは 0 を返すなど、文脈に依存するが、ここでは一般的な最大値を求める操作に基づき、数値が存在しない場合の扱いを明確にする必要がある。
        // ただし、仕様は「要素数と最大値」を求めることなので、要素がない場合は count=0, max=? となる。-Infinity は 64bit 整数の範囲外の概念であるため、ここでは入力された有効な値が一つもない場合は、実質的に何も最大値がないことになる。
        // 例として、入力が空だった場合（count=0）は以下のように出力する。
        process.stdout.write(`count=0 max=-1000000000000000000\n`); // 64bitの範囲内での「最大値なし」を示すための暫定的な値（実際には入力がないため、この出力は問題の解釈に依存する）
    }
}

solve();
