import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers: Set<number> = new Set();
    let totalSum: bigint = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNで非整数（または空文字列が渡された場合）をチェック
        if (!isNaN(num)) {
            // 無効な数値（例: "1.5" のような浮動小数点を含む文字列、あるいは非常に大きな値の文字列としてparseされなかったものなど）を除外する処理は、parseIntが持つ性質に依存します。
            // ここでは、入力が純粋な整数形式であると仮定し、実数との比較やオーバーフローはNode.jsの`number`型で一時的に扱います。

            // 重複をチェックし、セットに追加
            if (!uniqueNumbers.has(num)) {
                uniqueNumbers.add(num);
                totalSum += BigInt(num); // 合計は64bit整数に収まるため、BigIntで安全に計算
            }
        }
    }

    // 結果を出力
    console.log(`count=${uniqueNumbers.size} sum=${totalSum.toString()}`);
}

solve();
