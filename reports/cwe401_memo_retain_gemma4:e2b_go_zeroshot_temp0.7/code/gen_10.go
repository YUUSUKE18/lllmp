package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解析を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// n が 1 から始まることを保証（仕様上は 1 以上の整数が続く）
		if n < 1 {
			continue
		}

		// 再帰的/反復的に操作をシミュレーションし、メモ化を利用する
		// ここでは、与えられたnから1に到達するまでの手数を求める
		currentN := n
		steps := int64(0)

		// nが1のときの手数は0
		if currentN == 1 {
			memo[n] = 0
		} else {
			// メモ化された値があればそれを使用
			if val, ok := memo[currentN]; ok {
				steps = val
			} else {
				// 再帰的な計算とメモ化
				// 偶数なら n/2, 奇数なら 3n+1
				if currentN%2 == 0 {
					nextN := currentN / 2
					// 再帰的に呼び出し、結果を計算
					subSteps := calculateSteps(nextN, memo)
					steps = 1 + subSteps
				} else {
					nextN := 3*currentN + 1
					// 再帰的に呼び出し、結果を計算
					subSteps := calculateSteps(nextN, memo)
					steps = 1 + subSteps
				}
				memo[n] = steps
			}
		}

		// 合計に加算
		total += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}

// calculateSteps は、nから1に到達するまでの手数を再帰的に計算し、メモ化を更新する関数
// 呼び出し時に memo を参照・更新する
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	// メモがあればそれを使用
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64

	if n%2 == 0 {
		// 偶数: n/2
		nextN := n / 2
		result = 1 + calculateSteps(nextN, memo)
	} else {
		// 奇数: 3n+1
		nextN := 3*n + 1
		result = 1 + calculateSteps(nextN, memo)
	}

	// メモに結果を保存
	memo[n] = result
	return result
}
