import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではNumber型で十分だが、念のため）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素や空要素は無視される。
    // 要素数と最大値を計算する。
    // 空の入力があった場合、count=0, maxValue=-Infinityとなるが、問題の制約から入力がある前提とする。
    // もし入力が完全に無効な場合（例：空行のみ）、count=0, maxValue=-Infinityとなる。
    // 整数列が存在しない場合は、最大値の定義に注意が必要だが、ここでは読み込んだ有効な整数の最大値を求める。

    if (count === 0) {
        // 有効な整数が一つもなかった場合。この場合の最大値の出力形式を考慮する。
        // 仕様上は「要素数」と「最大値」を出力する必要があるため、もし入力が空なら count=0, max=? となる。
        // 読み込んだ有効な整数の最大値を求めるため、一つもなければ -Infinity を返すのが数学的には正しいが、
        // 64bit整数として扱うため、ここでは入力された値に基づき処理を続ける。
        // もし入力が空なら、count=0, maxValueは初期値のまま（-Infinity）となる。
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
