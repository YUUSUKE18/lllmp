import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(",");
    let count = 0;
    let maxVal = -Infinity;
    let foundNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェック（parseIntとNumber.isIntegerで厳密性を高める）
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num) && Number.isInteger(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            foundNumber = true;
        }
    }

    // 空要素や非整数を無視した場合、countが0になる可能性がある。
    // ただし、仕様では「要素数」と「最大値」を求めるため、実際に読み取った有効な整数の数をカウントする。
    // 読み取ったカンマ区切りの要素の総数ではなく、「整数として解釈できた要素」の数を数えるのが自然。

    if (count === 0) {
        // 整数が一つもなかった場合、最大値はどう扱うか？
        // 仕様から「要素数」と「最大値」を求めるとあるため、データが存在しない場合は適切な値を設定する必要がある。
        // ここでは、データが存在しない場合の挙動として、count=0, max=-Infinity (またはエラー)とするが、
        // 64bit整数範囲に収まるという制約から、もしデータがないなら count=0, max=0 または min値で考えるべきだが、
        // 単純に読み取れた整数の最大値を求めるため、データがない場合は適切に処理する。

        // 例として、データが一つもなかった場合は count=0, max=0 とするのが安全かもしれないが、
        // 読み取った要素の数を意味する場合、count=0 で良い。
        // 最大値は、有効な数が存在しないため、ここでは便宜上 0 とする（または -1 など）
        process.stdout.write(`count=0 max=0\n`); // データがない場合のデフォルトとして
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
