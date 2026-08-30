package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 処理対象のnが1以上であることを確認（仕様より）
		if n < 1 {
			continue
		}

		// 再帰/メモ化による操作の実行
		steps := calculateSteps(n, memo)
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}

// calculateSteps は、nが1になるまでの手数を計算し、メモ化を行う関数
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64

	if n%2 == 0 {
		// nが偶数なら n/2
		result = calculateSteps(n/2, memo)
	} else {
		// nが奇数なら 3n+1
		result = calculateSteps(3*n+1, memo)
	}

	// メモ化
	memo[n] = result
	return result
}
