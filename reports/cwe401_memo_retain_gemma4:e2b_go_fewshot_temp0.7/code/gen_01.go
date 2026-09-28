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
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			result := int64(0)
			total += result
			// メモ化
			memo[1] = 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的計算とメモ化
		var result int64
		if n%2 == 0 {
			// nが偶数なら n/2
			next := n / 2
			result = memo[next] + 1
		} else {
			// nが奇数なら 3n+1
			next := 3*n + 1
			result = memo[next] + 1
		}

		// 再帰呼び出し（実際には再帰ではなく、目標値1に向かって計算する）
		// ここでは、nから1に到達するまでのステップ数を計算する
		// 実際には、nが目標値1に到達するまでの操作の回数を数える必要がある。
		// 問題の意図を再解釈: nから1に到達するまでの操作の回数を求める。
		// nが偶数なら n/2、奇数なら 3n+1。これはCollatz予想に関連する操作。
		
		// 1に到達するまでの手数を計算する（Collatz数列のステップ数）
		currentN := n
		steps := int64(0)
		path := []int{}

		for currentN != 1 {
			if currentN == 0 {
				// 0に到達した場合（通常は発生しないが、念のため）
				break
			}
			path = append(path, currentN)

			if currentN%2 == 0 {
				currentN = currentN / 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}
		
		// 1に到達するまでの手数はsteps
		result = steps
		total += result
		
		// 全ての中間ステップをメモ化（最適化のため）
		for _, val := range path {
			if _, ok := memo[val]; !ok {
				// このメモ化は、クエリで登場する値全てをカバーするように行う
				// ただし、この問題は単一のクエリに対する結果を求めるので、
				// 繰り返し現れる値のメモ化というよりは、各クエリの結果を計算する。
				// 繰り返し現れる値のメモ化は、同じ値がクエリとして与えられた場合の最適化に使うべき。
			}
		}
		
		memo[n] = result
	}

	fmt.Printf("total=%d\n", total)
}
