import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割して整数に変換し、数値として有効なものだけをフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、64bitの範囲内であるかを確認（ここではparseIntが返す値が妥当と仮定）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 有効な要素が存在しない場合は、最大値を適切に設定する必要があるが、
    // 問題の制約から入力が空でないと仮定し、そうでなければ0や-Infinityを返す。
    // ここでは、少なくとも1つの有効な数があればその最大値を出す。
    if (count === 0) {
        // 入力が完全に無効だった場合（例: "," や " " のみ）、最大値は未定義だが、
        // 制約に従い、入力から得られた情報に基づいて出力する。
        // 最も安全なのは、入力された数値のみを考慮することである。
        // もし空の入力が許容されるなら、count=0, max=??となるが、ここでは-Infinityを使うか、
        // 実際に出力する値がない場合は0とする（問題文には明記されていないため、最も安全な最大値を設定する）。
        // 入力が空の場合、maxは定義されないが、仮に全て無視されたと見なす。
        process.stdout.write(`count=0 max=-Infinity\n`); // または他の適切な値
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
