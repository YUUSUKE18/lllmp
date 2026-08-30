package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewScanner(os.Stdin)
	
	// 目標値を読み込む (最初の非空行)
	var target int64
	for reader.Scan() {
		line := reader.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 数値化失敗を無視 (仕様: 整数として解釈できない行も無視)
		}
		target = n
		break
	}

	// 2 行目以降の整数を読み込む (スキャンバッファには既に最初の行は入っていないため、読み取り続ける)
	// ただし、問題文「2 行目以降」を考慮すると、標準入力 Stream の行数が重要だが、
	// Go の Scanner はライン単位でスクロールするので、目標値を読んだ後の残りを処理すればよい。

	pairs := int64(0)
	foundCount := -1 // この変数は「足して目標値になる組の個数」そのものを保持する。
					// ただし、入力データが非常に大きいため、単純な組み合わせ計算は O(N^2) となり時間制限を超えられる可能性がある。
					// ハッシュマップを用いたアプローチ (O(N)) が適切である。
					// map[int64]int: 値 -> その値を足して目標値になるもう一つの値の個数？
					// いや、通常は「seen[x] = count of x」。
					// 足して T になる組を探すなら：
					// current_val + prev_val = target
					// => prev_val = target - current_val
					// map[target - current_val] の値が増えればそれが答えとなる部分。

	// ただし、問題文の「2 行目以降の整数のうち」という制約と「位置が異なる 2 個」
	// という記述から、単純な配列を蓄積し、各数に対して必要数のペア数を累積していく必要がある。
	// ハッシュマップ: key = 値, value = その値が入力された回数
	mapped := make(map[int64]int)

	var lineNum int
	for reader.Scan() {
		line := reader.Text()
		if line == "" {
			continue // 空行は無視
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行も無視
		}

		// 足して target になる値 (target - val) を検索
		complement := target - val
		countOfComplement, exists := mapped[complement]
		if exists {
			pairs += countOfComplement
		}
		
		// 現在の値 also 入っている場合は、それ自身とペアを作れるか？
		// 「位置が異なる 2 個」という条件のため、同じ数値でも位置が異なれば OK。
		// ただし、上記ロジックでは「先に行ってきた complement の出現回数を」足すので、
		// 同じ値の組 (val == target - val => 2*val == target) を扱う際：
		// まず最初の入力をしたとき (例: target=4, val=2): complement=2. mapped[2] は 0 なので pairs+=0. mapped[2]=1 と更新。
		// 次の val=2 を入力: complement=2. mapped[2] は 1 なので pairs+=1. mapped[2]=2 と更新。
		// このとき、pairs が 1 となり、これは最初の 2 と現在の 2 のペア (2 個) を指す。
		// つまり、「位置が異なる」という条件は満たされる。
		
		mapped[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
