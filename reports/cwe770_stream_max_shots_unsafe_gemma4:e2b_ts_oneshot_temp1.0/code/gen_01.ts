import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/);

    let count = 0;
    let maxValue = -Infinity;
    let hasNumbers = false;

    for (const item of lines) {
        const num = parseInt(item, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasNumbers = true;
        }
    }

    // 空要素や非整数は無視されるため、実際にパースできた整数の数と最大値を記録する。
    if (count === 0) {
        // 入力が空または数値がなかった場合、仕様に厳密に従うため何を出力するか定義されていないが、ここでは0個、-Infinity（あるいは適切なエラー値）とするか、入力がないと仮定して何も出力しない選択肢もある。
        // しかし「要素数」と「最大値」を求めるので、もし数値が一つもなかった場合はどうすべきか？
        // 例示がないため、数値が存在しない場合は count=0, maxの解釈は難しい。ここでは入力された整数のみを対象とする。
        // 課題文の意図を尊重し、パースできた整数の数と最大値を出すことを優先する。
    }

    // 最終的な出力形式: count=<個数> max=<最大値>
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
