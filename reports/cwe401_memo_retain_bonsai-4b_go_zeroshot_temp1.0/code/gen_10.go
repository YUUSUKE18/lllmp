package main

import (
	"fmt"
	"unicode"
)

// memoは計算結果を保存して高速化
var memo = make(map[int]int)

func solve(n int) int {
	if memo[n] != nil {
		return memo[n]
	}

	if n == 1 {
		return 0
	}

	var current int
	current = n

	// 選択処理を繰り返す
	turn := 0
	while current != 1 {
		turn++

		// 偶数なら除算、奇数なら3n+1
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3 * current + 1
		}

		// 1を達成前の各ステップを计数
		// ここでは、計算の各手数を1ずつ计数しているが、反复実行時にメモ化
		// 無効な処理を実行しているだけでなく、結果をメモ化
		// 無効な処理を実行して、1に達するまでの数を計算
		for current > 1 {
			turn++
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3 * current + 1
			}
		}

		memo[n] = turn
	}

	return turn
}

func main() {
	// 1つずつ読み込む
	line := ""
	for {
		line = fmt.ScanStdin().String()
		if line == "" {
			break
		}
		// 整数を抜き出す
		// ここでは、文字列を文字列に分割して、数字を抜き出す
		num := 0
		for _, c := range line {
			if unicode.IsDigit(c) {
				num = num * 10 + int(c-'0')
			}
		}

		if num > 0 {
			result := solve(num)
			fmt.Printf("%d\n", result)
		}
	}

	// 全体の合計を出力
	total := 0
	for n := 1; ; n++ {
		result := solve(n)
		total += result
		if result == 0 {
			break
		}
	}

	fmt.Printf("%d\n", total)
}
