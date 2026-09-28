import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理を定義（ここでは例として）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が全て数字であることを確認する簡易的な方法。厳密にはより複雑だが、ここではパースが成功したものを採用）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 64bit整数の範囲を考慮し、入力がない場合は適切な値を入れる必要があるが、最大値を求めるので-Infinityで初期化されたままか、あるいは何らかのルールに従う。
    // 問題文の制約「値は 64bit 整数の範囲に収まります」と、「要素数と最大値を求める」ことから、空でない数値が存在すればそれを出力する。
    if (count === 0) {
        // 数値が一つもなかった場合の出力。仕様に厳密に従うため、もし入力があればそれに基づいて計算する。
        // 今回のロジックでは、入力があったのに有効な整数がなかった場合、 count=0, max=-Infinity となる。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
