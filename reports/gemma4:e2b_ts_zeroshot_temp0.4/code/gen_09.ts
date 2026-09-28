import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        if (part.trim() === '') continue;
        const num = parseInt(part.trim(), 10);
        // 数値として解釈でき、かつ整数であるかを確認（NaNチェックと念のため）
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum: bigint = 0n; // 合計が64bitに収まることを考慮し、安全のためBigIntを使用するが、最終出力は文字列として扱う

    for (const num of uniqueNumbers) {
        count++;
        // 合計を計算。入力の整数が大きくなる可能性があるため、sumもBigIntで保持するのが最も安全だが、
        // 仕様上「合計は64bit整数の範囲に収まる」とあるため、通常のNumber/BigIntで十分であると判断する。
        // ただし、JavaScriptの標準的なNumber型（53bit整数精度）を超えないか確認が必要。
        // 64bit整数 (約9.2 x 10^18) は安全なので、ここでは標準のNumberとして計算を進める。
        sum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
