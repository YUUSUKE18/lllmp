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

	// 1. 入力を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 2. メモ化された計算関数（再帰＋メモ化）を定義
		// 32bit整数には収まらない可能性があるため int64 を使用する
		memo := make(map[int]int64)

		var count func(n int) int64
		count = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = count(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = 3*int64(n) + 1 + count(3*int(n)+1)
			}

			memo[n] = result
			return result
		}

		// 3. 計算を実行し、合計に加算する
		// 注意: 問題文の意図を再確認します。
		// 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// これは、N -> N/2 (if even) または N -> 3N+1 (if odd) の操作を繰り返して 1 に到達するまでのステップ数を求める、という問題（コナーの問題の変種）です。
		// 置き換えの操作そのものの回数を数える、と解釈します。

		// 再度、操作の解釈を修正します。
		// 操作: nが偶数なら n/2、奇数なら 3n+1 に置き換える。これを繰り返して1に到達するまでの手数を求める。
		// これは、操作の回数を数える問題です。

		var steps int64 = 0
		currentN := n
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

	// 4. 結果を出力
	fmt.Printf("total=%d\n", total)
}
