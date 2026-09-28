import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bitの範囲を考慮するため、初期値は非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースする
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、64bitの範囲内（JavaScriptのNumber型で十分カバーされるが、念のため）
        // ここでは入力された値が正しく整数であるかを確認し、最大値を更新する
        if (!isNaN(num)) {
            // 数値が安全な範囲内にあることを確認（仕様上は64bitだが、JSのNumber型で十分扱う）
            // 負の値も考慮する必要があるため、-Infinityから比較する
            if (num > maxValue) {
                maxValue = num;
            }
            count++;
        }
    }

    // 空要素や不正な値は無視された。
    // countが0の場合は、最大値は定義できない（または0として扱う）が、仕様に従い見つけた最大値を出す。
    // 最初の入力が空だった場合など、count=0のケースを考慮する。
    if (count === 0) {
        // 入力がすべて無効な場合、count=0, max=0とするのが妥当だが、ここでは読み取った要素がないため、最大値は未定義として扱うか、-Infinityを返す。
        // 仕様に従い、もし要素が一つもなかったなら count=0, max=0 とする（実質的に空のセット）
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
