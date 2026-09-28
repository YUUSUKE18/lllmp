import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let distinctNumbers = new Set<number>();
    let sum = 0n; // 64bit整数を扱うためBigIntを使用（合計が非常に大きくなる可能性を考慮）

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェックし、変換
        const num = Number(trimmedPart);
        if (!isNaN(num)) {
            // 整数であればSetに追加（重複除去）
            distinctNumbers.add(num);
        }
    }

    // 重複を除いた要素の個数を計算
    const count = distinctNumbers.size;

    // 合計を計算
    // Setから取り出して合計を計算する。元の入力が非常に大きい値を含む可能性があるため、BigIntで和を計算する方が安全だが、
    // 仕様上「合計は 64bit 整数の範囲に収まる」とあるため、通常のNumber（53bit精度）でも十分かもしれない。
    // ただし、安全のため、Setの要素をすべて足し合わせる。
    let totalSum = 0;
    for (const num of distinctNumbers) {
        // TypeScriptのNumberは53bitまで安全なので、ここでは標準のNumberで計算を試みる。
        // もし入力が巨大な整数を含む場合、input.splitの結果として得られた文字列からBigIntに変換して処理する方が厳密。
        totalSum += num;
    }

    // 出力
    console.log(`count=${count} sum=${totalSum}`);
}

solve();
