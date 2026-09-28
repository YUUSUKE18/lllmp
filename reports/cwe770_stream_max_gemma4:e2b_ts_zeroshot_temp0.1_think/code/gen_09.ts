import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // 入力をカンマで分割し、各要素をトリムする
    const parts = input.trim().split(',');

    let numbers: number[] = [];

    // 各要素を整数として検証し、収集する
    for (const part of parts) {
        // 空文字列や空白のみの要素を無視
        if (part.trim() === '') {
            continue;
        }
        
        // 整数としてパースを試みる
        const num = Number(part);
        
        // isFiniteで数値であり、かつ整数であるかを確認する
        // (Number()は文字列から整数をパースするが、NaNやInfinityも含むため、isFiniteでチェックする)
        if (Number.isInteger(num) && isFinite(num)) {
            // 64bit整数範囲内であるという制約は、JavaScriptの標準Number型で十分に満たされると仮定する
            numbers.push(num);
        }
    }

    // 結果の計算
    let count = numbers.length;
    let max = -Infinity;

    if (count === 0) {
        // 要素が一つもなかった場合、最大値は定義できないが、仕様に従い適切な値を設定する必要がある。
        // ここでは、入力が空の場合は count=0, max=0 (または適切なデフォルト値)とする。
        // ただし、入力が空の場合、最大値の定義が曖昧になるため、ここでは count=0, max=0 とする。
        max = 0; 
    } else {
        // 最大値を計算
        max = numbers[0];
        for (let i = 1; i < count; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
    }

    // 結果を出力
    console.log(`count=${count} max=${max}`);
}

solve();
