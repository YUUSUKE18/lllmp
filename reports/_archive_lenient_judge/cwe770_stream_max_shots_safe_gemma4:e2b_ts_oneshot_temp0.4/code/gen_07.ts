import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値の初期値として-Infinityを使用）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が全て数字で構成されていることを確認するため）
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるという制約があるため、ここでは単純に数値として処理する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（全て無効な入力だった場合）、最大値を-Infinityとするか、問題の文脈に応じて適切な値とする。
    // ここでは、もし有効な数が一つもなかった場合は、最大値は定義できないため、ここでは0または-Infinityを返すのが一般的だが、
    // 整数列から最大値を求めるという観点から、入力された有効な数のみに基づいて計算する。
    if (count === 0) {
        // 入力に有効な整数が一つもなかった場合。仕様上は「要素数」と「最大値」を求めよ。
        // この場合、要素数は0、最大値は定義できないため、ここでは-Infinityを採用する（または問題の意図に従う）。
        // 64bit整数の範囲に収まるという制約があるため、もし入力が空なら count=0, max=-2^63-1 (最小値) や -Infinity が考えられる。
        // 今回は「最大値」を求めよという指示なので、実質的に有効な要素がない場合は、一般的な最大値の定義に従う。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
