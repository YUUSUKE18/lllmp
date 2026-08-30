import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムして配列にする
    const parts = input.split(',');
    
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェック
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // 値が64bit整数の範囲内にあることを確認（ここではNaNチェックで十分だが、念のため）
            // JavaScriptのNumberはIEEE 754倍精度であり、安全な整数範囲 (2^53-1) を超える値も扱えるため、
            // parseIntの結果をそのまま扱う。問題文の制約に従い、単純に最大値を更新する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 結果を出力
    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合の処理（ここでは0個、-Infinityまたは適切な値とする。
        // 課題の制約に基づき、要素数0、最大値は定義できないため、例えばmax=0として扱うか、あるいはデータがない場合は出力しないという解釈が可能だが、ここでは読み取った数値のみに基づいて計算を行う。）
        // 空の入力や無効な入力が与えられた場合でも、仕様に従いカウントと最大値を出す必要がある。
        // 整数として有効なものが一つもない場合は、count=0, max=-Infinityまたは0とするのが自然だが、ここでは読み取ったデータのみに基づくため、maxを定義する必要がある。
        // 仮に空の入力に対する要求がない場合は、-1などの sentinel 値を入れるか、単に出力しないが、指定された形式に従うため、少なくともcount=0を出力する。
        process.stdout.write(`count=0 max=-1\n`); // 有効な値がない場合のデフォルト出力（任意）
    }
}

solve();
