import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // 入力を文字列として処理する
    // 空行や前後の空白を無視するため、トリムして処理する
    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        // 入力が空の場合は何も出力しない
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = trimmedInput.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValid = false;

    for (const part of parts) {
        // 空文字列や空白のみの要素を無視
        const trimmedPart = part.trim();
        if (trimmedPart.length === 0) {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // 数値であり、かつ64bit整数として妥当な範囲内かを確認する
        // isFiniteでNaNやInfinityを除外し、整数であることを確認する
        if (Number.isInteger(num) && Number.isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValid = true;
        }
    }

    // 有効な要素が見つかった場合のみ結果を出力する
    if (count > 0) {
        // 厳密に指定された形式で出力する
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
