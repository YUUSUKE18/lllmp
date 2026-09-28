package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化テーブル
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = 1 + calculateSteps(n/2)
			} else {
				// n が奇数なら 3n+1
				steps = 1 + calculateSteps(3*n+1)
			}

			memo[n] = steps
			return steps
		}

		// 実際に計算を実行し、合計に加算
		// ここでは、各クエリで独立した計算を避けるため、メインループ内で再帰呼び出しを初期化する。
		// ただし、仕様では「すべてのクエリの手数の合計」を求めるため、
		// 各クエリごとに計算し、その結果を合計する。
		// memoはすべてのクエリを通じて共有されるべき。

		// 最初のクエリに対する計算
		currentN := n
		steps := calculateSteps(currentN)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理は省略するが、通常はログ出力などが考えられる
	}

	fmt.Printf("total=%d\n", total)
}
