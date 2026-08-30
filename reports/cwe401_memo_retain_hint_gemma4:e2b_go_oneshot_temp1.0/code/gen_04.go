package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var total int64
	scanner := bufio.NewScanner(os.Stdin)

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

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された計算を再帰的に実行し、合計に加算する
		// 効率化のため、再帰呼び出しではなく、手数を直接計算する関数を定義し、メモ化を適用する。
		// ここでは、各クエリに対して、手数を求める関数を定義し、その結果を蓄積する。

		// メモ化のためのマップ
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
				// nが偶数なら n/2
				steps = 1 + calculateSteps(n/2)
			} else {
				// nが奇数なら 3n+1
				steps = 1 + calculateSteps(3*n+1)
			}

			memo[n] = steps
			return steps
		}

		// 各クエリの結果を計算し、合計に加算
		// 注意: 問題文の「nが1のときの手数は0」を考慮し、計算開始時の値nから1に到達するまでのステップを数える。
		// 通常のCollatz問題では、nが1になるまでのステップ数を数える。
		// ここでは、クエリnに対して「1に到達するまでの手数」を求める。
		
		// 実行する計算が、個別のクエリごとに独立した計算になるように、外部ループで実行する。
		// 構造を修正し、入力された各nに対して計算を行う。
		// このループ内での再帰呼び出しは、各クエリに対して独立して計算されるべきである。
		
		// 1回のクエリに対する手数を計算
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
