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

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculate func(n int64) int64
		calculate = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = calculate(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				result = calculate(3*n + 1) + 1
			}

			memo[n] = result
			return result
		}

		// 計算と合計の加算
		// ここでは、各クエリ n について、1 に到達するまでの手数を計算し、合計に加算する。
		// ただし、問題文の解釈として、「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」と解釈します。
		// 置き換え操作の「手数」は、操作の回数です。

		// 再度、クエリ n から 1 に到達するまでの手数を計算するロジックを修正します。
		// 置き換え操作は「1 に到達するまでの手数」を求める問題（コナーの問題）です。
		// ここでは、与えられた n から 1 に到達するまでのステップ数を計算します。

		// 最初のクエリ n から 1 に到達するまでの手数を計算
		currentN := n
		steps := int64(0)
		for currentN != 1 {
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
