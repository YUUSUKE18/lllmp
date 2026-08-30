/**
 * 標準入力から目標値と整数リストを読み込み、
 * 目標値になる2つの整数の組の数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値
    const target = parseInt(input[0].trim(), 10);

    if (isNaN(target)) {
        console.log('pairs=0');
        return;
    }

    // 2行目以降: 数値リスト
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2つの組 (i, j) を探す。i != j
    // O(N^2) のアプローチ
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 64bit整数に収まることを確認 (N^2 は最大で (2*10^5)^2 = 4*10^10 程度になる可能性があり、
    // JavaScriptのNumber型 (53bit整数精度) を超える可能性があるが、
    // 入力サイズが実用的であると仮定すれば、N^2 の計算結果が安全な範囲内か、
    // または問題の制約がN^2の計算結果を直接求めないことを示唆している。
    // ここでは、N^2の計算結果が標準的な64bit整数（2^63-1）の範囲内であると仮定し、
    // JavaScriptのNumber型で十分と判断する。
    // もしNが非常に大きい場合（例: 10^6）、O(N^2)は間に合わないため、
    // O(N log N) のソート＋二分探索やハッシュマップを使うべきだが、
    // 仕様が「2個の組」の数を求めるだけであり、リスト内の要素の組み合わせを数えるため、
    // 2つの要素の和を求める問題として解釈し、O(N^2)で十分なケースを想定する。
    // もし、同じ値が複数存在する場合の重複カウントの扱いが問題になる場合は、
    // より複雑な処理が必要になるが、ここでは単純なペアのインデックスの組を数える。

    // 2つの組 (i, j) の数を求めるため、i < j の組を数えている。
    // これは「位置が異なる2個の組」を数えている。

    console.log(`pairs=${pairCount}`);
}

solve();
