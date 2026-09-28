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
	var totalCount int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や数値として解釈できない行をスキップ
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var count int64 = 0

		// 階乗の計算（または、この問題の操作の性質に基づいた直接計算）
		// この問題はCollatzの問題に似ているが、ここでは「1に到達するまでの手数」を求める。
		// n が 1 のときの手数は 0。
		if n == 1 {
			count = 0
		} else {
			// 探索とメモ化
			currentN := n
			path := []int{} // 経路を記録（デバッグ用、必須ではないがメモ化の確認に役立つ）

			for currentN != 1 {
				if _, found := memo[currentN]; found {
					// メモ化された値があれば、その手数を加算して終了
					memo[n] = memo[currentN] + int64(len(path))
					break
				}
				
				// 経路の記録（現在のステップ数を管理するため）
				path = append(path, currentN)
				
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
			}
			
			// 1に到達したときのステップ数を計算し、メモ化する
			// 経路の長さがステップ数になる
			if currentN == 1 {
				// 1に到達するまでのステップ数を計算し直す
				steps := 0
				tempN := n
				for tempN != 1 {
					if tempN%2 == 0 {
						tempN /= 2
					} else {
						tempN = 3*tempN + 1
					}
					steps++
				}
				memo[n] = int64(steps)
			}
		}

		// メモ化された結果を加算
		if result, ok := memo[n]; ok {
			totalCount += result
		} else {
			// メモ化されなかった場合（通常は到達するはずだが、念のため）
			// 再計算（メモ化が正しく機能しない場合のフォールバック）
			tempN := n
			steps := 0
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
			}
			totalCount += int64(steps)
		}
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalCount)
}
