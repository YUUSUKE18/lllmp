import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは標準のNumber型で十分と仮定）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合（仕様上は空の出力になるが、ここでは0個、-Infinityまたは適切な値を出力する）
        // 厳密には最大値が存在しないため、このケースの出力形式を定義する必要がある。
        // 例として、入力が空または無効な場合、count=0, max=-1 (または最小値)とするか、仕様に依存する。
        // ここでは、有効な数が存在しない場合は count=0, max=0 と仮定する（あるいは -Infinity を出力する）
        process.stdout.write(`count=0 max=-1\n`); // 0個の要素で最大値は定義できないため、ここでは-1などを採用
    }
}

solve();
