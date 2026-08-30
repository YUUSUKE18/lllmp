package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// n が 1 の場合は手数は 0
		if n == 1 {
			steps := int64(0)
			totalSteps += steps
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalSteps += val
			continue
		}

		// 再帰的または反復的に計算（メモ化を利用）
		currentN := n
		steps := int64(0)

		// 1 に到達するまで繰り返す
		for currentN != 1 {
			if currentN == 0 {
				// 0 に到達した場合、これは通常発生しないが、念のため処理を終了させる
				break
			}

			if currentN%2 == 0 {
				// n が偶数なら n/2
				currentN /= 2
			} else {
				// n が奇数なら 3n+1
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 結果をメモ化し、合計に加算
		memo[n] = steps
		totalSteps += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSteps)
}
