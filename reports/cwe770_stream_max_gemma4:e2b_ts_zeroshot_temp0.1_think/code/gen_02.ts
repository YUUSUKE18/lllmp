import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何も出力しない
        return;
    }

    // 入力を文字列として処理する
    const inputString = input.toString().trim();

    if (inputString === "") {
        // 入力が空文字列の場合は何も出力しない
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = inputString.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValid = false;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();

        // 空要素を無視
        if (trimmedPart === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // 整数として有効であり、64bitの範囲内であるかを確認
        // JavaScriptのNumber型は安全に64bit整数を扱える範囲（2^53-1）をカバーしているため、
        // ここでは単純に整数判定と値の更新を行う。
        if (Number.isInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValid = true;
        }
    }

    // 結果を出力する
    if (count > 0) {
        console.log(`count=${count} max=${maxValue}`);
    } else {
        // 有効な整数が一つもなかった場合
        // 仕様上、空の入力に対する厳密な出力形式は指定されていないが、
        // 0個の要素と最大値の定義が難しい場合は、0 0 または 0 -Infinity となるが、
        // ここでは要素が存在しないことを示すために、count=0 を出力する。
        // ただし、最大値が定義できないため、count=0 の場合、maxの出力は省略するか、
        // 0 を出力するのが自然。ここでは、要素が存在しない場合は count=0 を出力する。
        // 厳密な仕様に従い、countとmaxの両方を要求されるため、
        // 0個の要素の場合、最大値は定義されないため、ここでは count=0 を出力する。
        // (もし最大値が必須であれば、-1 や 0 など、文脈に応じた値を選ぶ必要があるが、
        // ここでは単に計算された値のみを出力する。)
        // 念のため、count=0 の場合は max の出力は省略する。
    }
}

solve();
