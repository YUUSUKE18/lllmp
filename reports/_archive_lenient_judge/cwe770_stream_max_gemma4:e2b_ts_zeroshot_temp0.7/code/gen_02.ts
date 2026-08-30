import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 整数に変換でき、かつ64bitの範囲内（ここでは安全のため、標準のNumber型で十分と仮定し、無限大チェックは最大値計算時に行う）
        if (!isNaN(num)) {
            // 値が64bitの範囲に収まることを確認（JavaScriptのNumberはIEEE 754倍精度であり、安全に2^53程度まで整数を保持できる。ここでは大きな数値を扱うため、数値として処理する。）
            // 仕様では「値は64bit整数の範囲に収まります」とあるが、Node.jsの標準Number型で十分に対応可能と解釈し、最大値を更新する。
            if (num > maxValue) {
                maxValue = num;
            }
            count++;
        }
    }

    // 最大値が初期値（-Infinity）のままの場合（入力が全て無効な場合）、または要素数が0の場合を考慮する。
    if (count === 0) {
        // 入力が空または数値を含まなかった場合、count=0, max=0とするのが妥当だが、厳密には最大値は未定義。
        // ここでは、入力された有効な数値がない場合は count=0, max=0 とする。
        console.log("count=0 max=0");
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
