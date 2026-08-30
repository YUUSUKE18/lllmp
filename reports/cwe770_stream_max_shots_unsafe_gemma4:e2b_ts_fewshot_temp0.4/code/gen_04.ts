import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    if (count === 0) {
        // すべての要素が無効または空だった場合、最大値は定義できない（ここでは0として扱うか、仕様に依存するが、整数列がない場合はmaxをどうするか。ここでは入力された有効な数の最大値を求めるため、何もあれば-Infinityだが、count=0ならmaxも意味を持たない。問題文の意図から、少なくとも1つの数値があればその最大値を出力すると解釈する）
        // 念のため、もし有効な数が一つもなかった場合は、maxを適切に設定する必要があるが、ここでは「要素数と最大値」を求めるため、count=0ならmaxは無視されるか、あるいは入力された範囲で最も小さい値（例: 0または最小の64bit整数）とする。
        // 例として、空の入力に対しては count=0, max=0 とするのが安全かもしれないが、ここでは「存在する有効な数」に基づいて計算する。count=0ならmax=-Infinityだが、出力形式に合わせるため、もし何も見つからなかった場合は最大値を出力しない（または0とする）のが自然。
        // 課題の例がないため、入力された数値が存在する場合のみ最大値を求めるものと解釈し、count=0の場合はmaxをどうするかは不明確だが、ここでは-Infinityが最も正確な数学的表現である。しかし、出力形式に合わせるため、もしcount=0ならmaxを0とする（あるいは問題の制約に従う）。
        // 整数列がない場合は、最大値が存在しないため、ここでは count=0, max=0 と仮定する。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
