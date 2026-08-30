import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは一般的なJSのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // すべての要素が整数として解釈できた場合、maxを更新する。
    // 整数として解釈できなかった要素は無視されるため、countとmaxは有効な数値のみを考慮したものとなる。
    if (!hasValidNumber) {
        // 有効な整数が一つもなかった場合（例: "a,b"）、 count=0, max=-Infinity となるが、
        // 課題の意図を考えると、入力に数字が含まれていればその最大値を求めるべき。
        // 空要素・非数値要素は無視されるため、有効な数が存在しない場合はcount=0, max=0 (または適切なデフォルト)とするのが自然だが、
        // ここでは読み込んだ有効な数に基づいて計算する。もし入力が空文字列のみなら count=0, max=-Infinity になる可能性がある。
        // 整数列として解釈できない要素を無視するという指示に基づき、countとmaxは抽出された数値のみに依存する。
        if (parts.length > 0) {
            // 入力があったが有効な数字がなかった場合（例: "a,b"）、 count=0, max=-Infinity が返る可能性がある。
            // 64bit整数として扱うため、もし有効な数が一つもなければ最大値は定義できないが、ここでは読み込んだ数に基づき処理を続ける。
            // ただし、例題の動作から、数値が存在すればそれを返すことを期待する。
            // 数値が存在しない場合は、maxの初期値(-Infinity)が残るか、あるいは0でリセットする必要がある。
            // 整数として解釈できた要素のみを数えるため、countとmaxは正しく計算されているはず。
        }
    }

    if (count === 0) {
        // 有効な整数が一つもなかった場合（例: ",," または "a,b"）、最大値は定義できないが、ここでは安全のため0とするか、-Infinityを扱う。
        // 64bit整数の範囲に収まることを考慮し、有効な数が存在しない場合は max=0 とするのが妥当かもしれない。
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
