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

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// nが1以上の整数であるか確認（仕様上は1以上の整数が並ぶと仮定）
		if n < 1 {
			continue
		}

		// 繰り返し操作をシミュレーションし、手数を計算する関数
		var count int64 = 0
		currentN := n

		// メモ化された値が存在しない限り、計算を開始する
		if _, found := memo[n]; !found {
			// 1に到達するまでの手数を計算
			for currentN != 1 {
				if currentN == 1 {
					break // 1に到達したら終了
				}

				// メモ化された値があればそれを使用
				if val, ok := memo[currentN]; ok {
					count += val
					break
				}

				// 操作の適用
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				count++
			}

			// 計算結果をメモ化
			memo[n] = count
		} else {
			// メモ化された値があればそれを使用
			count = memo[n]
		}

		// 合計に加算
		totalCount += count
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalCount)
}
