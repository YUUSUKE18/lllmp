import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白を無視して整数に変換する
    const parts = input.trim().split(',');
    
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 空文字列や空白のみの要素をスキップ（split(',')で得られた要素自体にスペースが含まれる可能性も考慮）
        if (part.trim() === "") continue;

        const num = parseInt(part.trim(), 10);

        // 整数として解釈可能か、かつ64bit範囲内かを確認する（ここでは単純にNaNチェックと数値の比較を行う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合（仕様上は特に指定はないが、安全のため）
        // このケースでは count=0, max=エラー値となるが、ここでは入力された要素数と最大値を求めるため、
        // 実際に解析できた数値がない場合は適切な出力をする。
        process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値
    }
}

solve();
