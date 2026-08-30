import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    
    // カンマで分割し、トリムして空でない要素をフィルタリングする
    const parts = input.split(",");
    const numbers = [];
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart !== "") {
            const num = parseInt(trimmedPart, 10);
            // 整数として解釈でき、64bit範囲内であることを確認（ここではparseIntの範囲に依存するが、問題の制約に従う）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    const count = numbers.length;
    let maxValue = -Infinity;

    if (count === 0) {
        // 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは空のセットに対する処理を考慮する。
        // ただし、入力が空文字列やカンマのみの場合、count=0, max=? となる。
        // 数値が存在しない場合は、最大値を -Infinity や 0 などとして扱う必要があるが、
        // 通常は数値が存在する場合のみ最大値を計算するため、ここでは count=0 の場合に maxValue を適切に設定する。
        // 問題の制約から、もし要素がないなら max は定義できないか、あるいは入力が空であると仮定して count=0, max=0 などとするのが安全かもしれない。
        // ここでは、数値が存在しない場合は最大値を計算しない（または定義された範囲外として扱う）という方針をとる。
        // 最小の64bit整数は -2^63, 最大値は 2^63-1。ここでは入力が空の場合は max=0 と仮定する。（例示がないため、最も安全なデフォルト値を選ぶ）
        maxValue = 0; // 入力が空の場合のデフォルト値として0を採用
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
