import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内かチェック（ここでは単純にNaNチェックと数値としての比較を行う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない場合（入力が空または数値がなかった場合）、最大値を0とするか、仕様に合わせて処理する。
    // 入力が空でなければ少なくとも1つの要素が存在するため、count > 0 の場合 maxValue は更新されているはず。
    // もし全ての要素が非数値だった場合は count=0, maxValue=-Infinity となるが、ここでは>=0の整数を想定しているため、
    // 数値が見つからなかった場合のデフォルト値として0を採用する（もし入力に正の数が存在しない場合）。
    const finalMaxValue = count > 0 ? maxValue : 0;

    process.stdout.write(`count=${count} max=${finalMaxValue}\n`);
}

solve();
