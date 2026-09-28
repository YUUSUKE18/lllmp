package main

import (
	"bufio"
	"fmt"
)

// 3n+1 無限ループの処理を行うため、memo化を用意
var memo = make(map[int]int)

// ループが1で終まるまで、nの手数を計算
func computeSteps(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		memo[1] = 0
		return 0
	}
	if n%2 == 0 {
		next := n / 2
		memo[n] = 1 + computeSteps(next)
		return memo[n]
	} else {
		next := 3 * n + 1
		memo[n] = 1 + computeSteps(next)
		return memo[n]
	}
}

// ループ処理を行う
func main() {
	var input string
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		if line == "1" {
			continue
		}
		// 1行に1個の整数が入っている
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		// nをn/2に変えるループが終めるまでのステップ数を計算
		// nが1なら0
		// 1は終了
		// nが奇則3n+1で変更
		// 2はn/2に変更
		// 結果をmemoに保存
	.steps := computeSteps(int(line))
		// 最终の結果を累加
		totalSteps := totalSteps + steps
	}
	// 最終の結果を出力
	fmt.Printf("%d\n", totalSteps)
}
