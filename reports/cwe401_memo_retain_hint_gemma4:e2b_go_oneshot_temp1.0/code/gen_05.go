package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var totalCost int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateCost func(k int64) int64
		calculateCost = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if cost, found := memo[k]; found {
				return cost
			}

			var cost int64
			if k%2 == 0 {
				// nが偶数なら n/2
				cost = calculateCost(k / 2)
			} else {
				// nが奇数なら 3n+1
				cost = 3*k + 1 + calculateCost(3*k+1)
			}

			memo[k] = cost
			return cost
		}

		// クエリ n から 1 に到達するまでの手数を計算
		// この問題は「nが1に到達するまでの手数」を求めるので、
		// 貪欲に操作を繰り返す経路ではなく、nが生成される過程を追跡する必要があります。
		// 問題文の解釈に基づき、nが与えられたとき、nが1になるまでの操作回数を求める、という形ではなく、
		// 1回のクエリ n に対して、操作を繰り返して1に到達するまでのステップ数を求める、と解釈します。
		// (nが偶数ならn/2、奇数なら3n+1)
		
		// ここでは、クエリ n に対し、nが1になるまでの操作の総ステップ数を求めることに焦点を当てます。
		// ただし、制約が「nが1に到達するまでの手数」なので、これは通常、Collatz予想の文脈で考えられる計算です。
		// 状態遷移: n -> n/2 (nが偶数) または n -> 3n+1 (nが奇数)
		
		// nが与えられたとき、1に到達するまでのステップ数を計算します。
		currentN := n
		steps := int64(0)
		
		// nが1になるまで繰り返す
		for currentN != 1 {
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		totalCost += steps
	}

	fmt.Printf("total=%d\n", totalCost)
}
