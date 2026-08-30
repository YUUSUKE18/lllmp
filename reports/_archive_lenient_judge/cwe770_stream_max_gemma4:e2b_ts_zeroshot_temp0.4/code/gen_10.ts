import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値は非常に小さい値とする

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値が有効な整数であり、64bitの範囲内であるかを確認する（ここでは標準のNumber型で十分だが、念のため）
        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数の範囲内であることを確認 (JavaScriptのNumberはIEEE 754倍精度であり、安全に扱う範囲)
            // 問題文の制約に従い、値が64bit整数として扱えることを前提とする。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 処理した要素が一つもなかった場合や、全ての要素が無効だった場合の処理（入力が空または不正な場合）
    if (count === 0) {
        // 入力が完全に無視された場合、ここでは count=0, max=0 とするのが最も安全だが、
        // 空の入力に対しては「要素数と最大値」を求める操作自体が行われなかったため、
        // 厳密には何も読み取れなかったことを示すべき。
        // ただし、仕様上、読み取れた有効な整数がない場合、count=0, max=? となるが、
        // 最大値を定義できないため、ここでは count=0, max=0 とする（または -Infinity を使用する）
        // 最小値の制約がないため、データが存在しない場合は 0 を返すのが一般的。
        console.log(`count=0 max=0`);
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
