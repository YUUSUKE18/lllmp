import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、トリムして空でない要素をフィルタリング
    const parts = input.split(",");
    const numbers = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        
        // 整数として解釈可能かチェック
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    const count = numbers.length;
    let maxValue = -Infinity;

    if (count === 0) {
        // 要素が一つもなかった場合、最大値は定義できないが、問題の制約から整数として扱われるため、
        // 入力が空または無効な場合を考慮し、ここでは安全のため0とするか、あるいは入力がない場合は適切な処理を行う。
        // 整数列が空の場合、count=0, max=0とするのが自然だが、最大値の定義に注意が必要。
        // ここでは、もし数値が存在しなければ、maxは未定義となるため、入力がない場合は count=0, max=0とする。
        maxValue = 0; // 入力が空の場合は最大値を0とする（あるいは問題の意図に従う）
    } else {
        // 最大値を計算
        maxValue = numbers[0];
        for (let i = 1; i < count; i++) {
            if (numbers[i] > maxValue) {
                maxValue = numbers[i];
            }
        }
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
