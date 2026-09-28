package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo は n -> 手数 のマッピング
var memo = make(map[int]int)

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}
	hand = 0 // 手数を計算するための変数として使用 (修正: ローカル変数名を避けるため、内部ロジックを変更)
	// 再帰で計算し、結果をメモ化
	res := solveCollatz(n)
	memo[n] = res
	return res
}

func solveCollatz(n int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}
	var steps int
	if n%2 == 0 {
		steps = 1 + solveCollatz(n / 2)
	} else {
		steps = 1 + solveCollatz(3*n + 1)
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := 0
	var n int64 // 64bit 整数用

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		// 空白区切り文字列を処理
		fields := []string{}
		for _, f := range fields(line) {
			var val int64
			if n, err := strconv.ParseInt(f, 10, 64); err == nil {
				val = n
			} else {
				continue // 整数として解釈できない行は無視
			}
			totalSteps += solveCollatz(val)
		}
	}

	fmt.Printf("total=%d\n", totalSteps)
}
