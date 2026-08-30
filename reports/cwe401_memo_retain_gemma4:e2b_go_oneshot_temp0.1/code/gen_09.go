package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的計算とメモ化
		var steps int64
		if n%2 == 0 {
			// nが偶数なら n/2
			steps = 1 + memo[n/2]
		} else {
			// nが奇数なら 3n+1
			steps = 1 + memo[3*n+1]
		}

		// 実際には、この問題は「nが1になるまでの手数」を求めるものであり、
		// 置き換え操作を繰り返す過程で、その過程のステップ数を数える必要があります。
		// 置き換え操作を繰り返す過程で、nが1になるまでの手数を求めるため、
		// 以下のロジックで再帰的に計算し、メモ化します。

		// 再帰的な計算を再定義します。
		// f(n) = 1 + f(n/2) if n is even
		// f(n) = 1 + f(3n+1) if n is odd
		// f(1) = 0

		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				// nが偶数なら n/2
				result = 1 + calculateSteps(k/2)
			} else {
				// nが奇数なら 3n+1
				result = 1 + calculateSteps(3*k+1)
			}

			memo[k] = result
			return result
		}

		// 計算を実行し、合計に加算
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
