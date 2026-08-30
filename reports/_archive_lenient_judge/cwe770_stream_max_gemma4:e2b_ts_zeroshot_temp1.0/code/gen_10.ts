/**
 * 標準入力からカンマ区切りの整数列を受け取り、その要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();

        if (trimmedPart === "") {
            continue; // 空要素は無視
        }

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェック（非整数値が混じっている可能性があるため）と、元の文字列が完全に数字のみで構成されているかを確認する必要がある。
        // ただし、仕様上は「整数として解釈できない要素も無視」なので、parseIntが正常に動作し、かつそれが意図した数値であるかを厳密にチェックする。
        // 浮動小数点数などが含まれていた場合 (例: "1.5" -> 1)、または文字が含まれていた場合 (例: "abc" -> NaN) を無視する。
        if (!isNaN(num)) {
            // ここで、元の文字列が完全に整数のみで構成されているかを確認するために、文字列として再検証することも考えられるが、
            // 一般的な競技プログラミングの文脈では、parseIntの結果が有効であれば採用することが多い。
            // ただし、「整数として解釈できない要素も無視」という要求を満たすため、厳密に整数値のみを採用する。

            // strconv.Numberを避けるため、文字列から数値に変換した結果が元の文字列（空白を除去したもの）と一致するかを確認することは難しい。
            // シンプルに、parseIntが成功し、それが無効な文字を含まなかった場合に採用する。
            // 今回の仕様は「整数として解釈できない要素を無視」なので、parseIntで数値が得られればOKとするのが最も簡潔である。

            // 64bit範囲内であるかチェック (JavaScriptのNumber型はIEEE 754倍精度であり、安全に扱える)
            if (num >= -2**53 && num <= 2**53 - 1) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                validNumbersFound = true;
            }
        }
    }

    // 値が見つからなかった場合、maxは適切に処理する必要がある。
    // 要素がない場合は max は定義されないが、ここでは count=0, max=0 または max=-Infinity とするのが妥当。
    // 最大値の制約が64bit整数であるため、実質的に入力された数の中に最大値が存在しない場合（要素が0個の場合）を考慮する。

    if (!validNumbersFound) {
        // 入力が空だったか、数値として有効なものが一つもなかった場合 (例: "a,b" または "")
        console.log("count=0 max=0"); // ゼロ要素・最大値で出力
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
