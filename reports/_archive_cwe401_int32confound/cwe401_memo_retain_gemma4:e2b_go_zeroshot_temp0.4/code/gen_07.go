package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し操作をシミュレーション
		currentN := n
		count := int64(0)

		// 1 に到達するまで繰り返す
		for currentN != 1 {
			// メモ化された値があればそれを使用
			if val, ok := memo[currentN]; ok {
				count += val
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN = currentN / 2
			} else {
				currentN = 3*currentN + 1
			}
			count++

			// 再帰的なメモ化（ここでは単純な経路追跡として実装。
			// 実際には、到達した値から1までの最短経路を計算する問題なので、
			// 1に到達するまでのステップ数を計算する。
			// ここでは、nから1に到達するまでのステップ数を計算する。
			// サイクルを避けるため、到達した値が既に計算済みか確認する。
			if currentN == 1 {
				break
			}
		}

		// 最終的な手数を加算
		if currentN == 1 {
			// 1に到達したときのステップ数を計算し直す（メモ化をより適切に行う）
			// この問題は、nから1に到達するまでのステップ数を求める問題であり、
			// 1に到達するまでの経路を追跡する問題であるため、
			// サイクルを考慮したメモ化が必要になる。
			// 今回は、nから1への経路を追跡するシンプルな方法を採用し、
			// サイクルを考慮して再帰的に計算する形に修正する。

			// 再度、メモ化をより適切に行うための再帰的なアプローチを採用する。
			// 1に到達するまでの手数を求める問題は、通常、nから1への経路を計算する。
			// サイクルを考慮し、到達した値から1への最短経路を求める。

			// -------------------------------------------------------------------
			// 再帰的なメモ化による正しい計算方法に修正
			// -------------------------------------------------------------------
			memoRec := make(map[int]int64)
			
			var calculateSteps func(k int) int64
			calculateSteps = func(k int) int64 {
				if k == 1 {
					return 0
				}
				if val, ok := memoRec[k]; ok {
					return val
				}

				var result int64
				if k%2 == 0 {
					// nが偶数なら n/2
					result = calculateSteps(k / 2)
				} else {
					// nが奇数なら 3n+1
					result = calculateSteps(3*k + 1)
				}

				// メモ化
				memoRec[k] = result
				return result
			}

			steps := calculateSteps(n)
			total += steps
		}
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", total)
}
