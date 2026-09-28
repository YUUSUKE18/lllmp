import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // 入力をカンマで分割し、各要素を処理する
    const parts = input.trim().split(',');

    let count = 0;
    let max = -Infinity;
    let foundValidNumber = false;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // isFiniteで数値であり、かつ整数として解釈できるかを確認する
        // (ここでは、浮動小数点数も許容するが、整数として扱う)
        if (Number.isInteger(num)) {
            // 64bit整数の範囲内であるか（JavaScriptのNumber型は安全に扱える範囲）
            // 厳密な64bit整数チェックは、入力が非常に大きい場合に必要だが、ここでは標準的な数値として扱う
            
            count++;
            if (num > max) {
                max = num;
            }
            foundValidNumber = true;
        }
    }

    // 結果を出力する
    // 処理された要素が一つもなかった場合は、count=0 max=-Infinity となるが、
    // 仕様上、入力が空の場合の挙動は明記されていないため、
    // 少なくともcount=0 max=0 (または適切なデフォルト値)とするか、
    // 実際に見つかった値に基づいて出力する。
    
    // 整数が見つからなかった場合は、count=0, max=0 (または-Infinity)とする。
    // 最小値が-2^63程度まで許容されるため、-Infinityは適切。
    
    if (count === 0) {
        // 整数が一つもなかった場合、最大値は定義できないため、0を出力する。
        // ただし、もし入力が空でなければ、maxは-Infinityになる。
        // 厳密に「要素数と最大値」を求めるため、要素が0個なら最大値は定義されない。
        // ここでは、要素が0個の場合は、count=0, max=0とする。
        console.log(`count=0 max=0`);
    } else {
        console.log(`count=${count} max=${max}`);
    }
}

solve();
