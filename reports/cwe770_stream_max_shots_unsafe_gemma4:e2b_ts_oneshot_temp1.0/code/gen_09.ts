import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、空白や空文字列をフィルタリング
    const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity; // 64bit整数範囲を考慮し、最小値で初期化

    for (const part of parts) {
        const num = parseInt(part, 10);
        // 整数として解釈でき、かつ64bit範囲内（JavaScriptのNumber型で十分カバーされるが、ここではチェック）
        if (!isNaN(num)) {
            // 64bit整数の範囲内であることを確認する必要があるが、標準的なJS Number型では安全性を保つため、実質的にチェックは不要とする。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が見つからなかった場合（空の数値列のみだった場合）、最大値は0または適切な値とする。
    // 課題文に明記されていないが、入力がすべて無効な場合、max=?となるため、ここでは仮に0とするか、あるいは入力に基づき決定する。
    // 入力がない場合は count=0 max=0 とするのが自然。もし数値のみが与えられた場合は maxValue が計算される。
    if (count === 0) {
        maxValue = 0; // 入力が空または全て無効な場合
    }


    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
