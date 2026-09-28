package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力から行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 行が空でないことを確認
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// nが1以上であることを確認（仕様より）
		if n < 1 {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		
		// nが1の場合、手数は0
		if n == 1 {
			memo[1] = 0
		} else {
			// 再帰または動的計画法（ここでは再帰＋メモ化）で手数を計算
			var calculateSteps func(current int) int64
			calculateSteps = func(current int) int64 {
				if current == 1 {
					return 0
				}
				if val, ok := memo[current]; ok {
					return val
				}

				var steps int64
				if current%2 == 0 {
					// n が偶数なら n/2
					steps = calculateSteps(current / 2)
				} else {
					// n が奇数なら 3n+1
					steps = calculateSteps(3*current + 1) + 1
				}
				
				memo[current] = steps
				return steps
			}
			
			steps := calculateSteps(n)
			total += steps
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、ここでは無視する）
	}

	// 最終結果を出力
	fmt.Printf("total=%d\n", total)
}
