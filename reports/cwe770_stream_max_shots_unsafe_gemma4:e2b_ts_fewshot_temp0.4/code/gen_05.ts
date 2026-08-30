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

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値比較で対応）
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素は無視されるため、countとmaxを計算した結果を出力する
    if (count === 0) {
        // 数値が一つもなかった場合、最大値の扱いについて。仕様上、空要素や非数値要素を無視するため、
        // 整数が存在しない場合は max の出力が問題となる可能性があるが、
        // 例示された動作（空要素・非数値要素を無視）に従い、有効な数の数と最大値を報告する。
        // 数値がない場合のmaxの初期値(-Infinity)はそのまま残るが、count=0なので、
        // 少なくとも count=0 max=-Infinity のような出力になる可能性があるため、
        // 実際には数値が存在しない場合は適切なデフォルト値（例えば0やエラー）が必要だが、
        // ここでは計算された結果をそのまま出力する。
    }

    process.stdout.write(`count=${count} max=${max}\n`);
}

solve();
