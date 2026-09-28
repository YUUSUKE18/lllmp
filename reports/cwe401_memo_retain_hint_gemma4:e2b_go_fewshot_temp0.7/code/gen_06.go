package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行または整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または動的計画法で計算
			var count int64
			if n%2 == 0 {
				// nが偶数なら n/2
				count = memo[n/2] + 1
			} else {
				// nが奇数なら 3n+1
				count = memo[3*n+1] + 1
			}
			memo[n] = count
		}

		// 計算結果を合計に加算
		total += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は競技プログラミングでは省略されることが多いが、念のため）
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
