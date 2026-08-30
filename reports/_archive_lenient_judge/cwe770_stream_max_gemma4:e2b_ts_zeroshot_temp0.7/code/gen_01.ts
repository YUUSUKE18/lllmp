/**
 * 標準入力からカンマ区切りの整数列を受け取り、その要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=-Infinity"); // 空入力の場合の処理（最大値を定義する必要があるため）
        return;
    }

    // カンマで分割し、各要素を数値に変換しようと試みる
    const parts = input.split(',');
    
    let count = 0;
    let maxValue = -Infinity; // 64bit整数として扱うため、初期値は非常に小さい値とする（または最初の有効な値で初期化する）

    for (const part of parts) {
        // 前後の空白を無視して数値に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue; // 空要素は無視
        }
        
        // 整数として解釈できるか確認し、64bit範囲内であるかを確認する（JavaScriptのNumber型はIEEE 754倍精度であり、安全にはBigIntを使うべきだが、ここでは「64bit整数の範囲に収まる」という制約に基づき標準のNumberで処理を試みる）
        const num = Number(trimmedPart);
        
        // 数値として有効であり、かつ整数であるか確認する
        if (Number.isInteger(num)) {
            // 64bit整数の範囲内にあることを確認（ここではJavaScriptの安全性を考慮し、一般的な数値範囲を想定）
            // BigIntが必要なほど巨大な場合は別途検討が必要だが、問題文の要求に従い標準の数値で処理する。
            if (num >= -(2**53) && num <= (2**53 - 1)) { // 安全な整数範囲内かどうかのチェック（より厳密には64bitの限界）
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 最大値が見つからなかった場合（入力が全て無効な場合）、最大値を適切に設定する。
    // 問題文の制約上、有効な整数が一つでも存在すればmaxValueは更新される。
    if (count === 0) {
        // 入力が空または非数値のみの場合、最大値の設定は文脈依存だが、ここでは-Infinityを採用するか、あるいは入力がないことを示す。
        // 厳密には「最大値」が存在しないため、このケースの出力形式を定める必要がある。
        // ただし、もしcount=0なら、maxは何を意味するか不明確なため、一旦、データがない場合は適切な値を設定する。
        // 今回は入力が空でない限り、少なくとも一つの数値が処理されることを期待する。
        // 念のため、countが0の場合は最大値を出力しないか、または定義されたルールに従う。ここでは実質的に該当なしとする。
        console.log(`count=0 max=-Infinity`);
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
