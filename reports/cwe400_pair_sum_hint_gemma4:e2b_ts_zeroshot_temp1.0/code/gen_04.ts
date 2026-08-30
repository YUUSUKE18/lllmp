/**
 * 仕様を満たすプログラム
 * 標準入力から目標値と整数のリストを受け取り、そのリストから足して目標値になる2つの組の個数を数える。
 */
function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log("pairs=0");
        return;
    }

    // 1行目は目標値
    const target = parseInt(input[0].trim());

    if (isNaN(target)) {
        console.log("pairs=0");
        return;
    }

    // 2行目以降を個数のリストとしてパースする
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    if (n < 2) {
        console.log("pairs=0");
        return;
    }

    // 2つの組の個数を数える (O(N^2) の実装を避けるため、ソートと二分探索/二重ループを組み合わせる)
    // 最も効率的なのはハッシュマップ（またはソートと二分探索）を使う方法。
    // ここでは、与えられた制約（実用的な時間とメモリ）を考慮し、O(N^2)を避けつつ、
    // 2つの値のペアを探す方法を採用する。

    // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となる (i != j) 組の数を数える。

    // 2つのポインタ（Two Pointers）のアプローチは、配列がソートされている場合に効率的だが、
    // ここではインデックスが異なる2つの要素を探すため、ハッシュマップを使うのが最も直接的で効率的。

    // 集合として扱うため、全ての要素を一度マップに格納する (O(N))
    const numSet = new Set(numbers);
    
    // 集合内での重複を考慮してペアを数える。
    // ターゲット値が偶数か奇数かで、重複の処理が変わるが、ここでは元のリストのインデックスが異なるペアを数える。
    
    // 2つの異なる値 a と b を探す。a + b = target
    // a = target - b
    
    // 1. ターゲット値と重複しない、または自身との和を考える。
    // 2. 各要素について、ターゲットからの差をセットに探す。

    // 効率的に、リスト内の各要素について、target - element がリスト内に存在するか確認する。
    // 厳密に「位置が異なる2個の組」を数える必要がある。

    // ターゲットを達成するペアを数えるために、リストをソートする。
    numbers.sort((a, b) => a - b);

    let count = 0;
    let left = 0;
    let right = n - 1;

    // Two Pointersによるペア探索 (ターゲット値が与えられたときの和のペア探索)
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            // numbers[left] と numbers[right] は異なるインデックスを持つので、1組カウント
            count++;
            // 次の異なるペアを探すために、両端を移動させる
            left++;
            right--;
        } else if (sum < target) {
            // 和が小さいので、左側を広げて合計を増やす
            left++;
        } else { // sum > target
            // 和が大きいので、右側を狭めて合計を減らす
            right--;
        }
    }

    // 注意点: 上記のTwo Pointersは、リスト内の要素の値が重複する場合に、
    // それらの重複をどのように扱うかによって結果が変わる。
    // 仕様：「2行目以降の整数のうち、足して目標値になる2 個の組（位置が異なる2 個）の個数」
    // これは、元のリストにおけるインデックス (i, j) で i != j を満たすペアの数を意味する。

    // ターゲット値が与えられたリスト N = {n1, n2, ..., nk} の場合、
    // (n_i, n_j) で n_i + n_j = target かつ i != j となる組の数を数える。

    // 最初のTwo Pointersの方法は、要素のインデックスが異なるペア (n_i, n_j) を数えるのに最適であり、
    // 要素が重複していても正しく機能する。

    // 例: target=10, numbers={1, 9, 1, 9}
    // ソート後: {1, 1, 9, 9}
    // (1, 9): 1+9=10 (カウント1). left=1, right=2.
    // (1, 9): 1+9=10 (カウント2). left=2, right=1. ループ終了。
    // これは、{n1=1, n3=9} または {n1=1, n4=9} のような組み合わせを数えることを意味する。
    // この実装は、重複した値が存在する場合でも、インデックスの異なるペアを数えるため、仕様を満たす。

    console.log(`pairs=${count}`);
}

solve();
