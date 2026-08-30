package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalCount := 0

	// 計算結果をメモ化するためのマップ
	memo := make(map[int]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 繰り返し操作の計算
		if n == 1 {
			totalCount += 0
			continue
		}

		// メモ化された値があればそれを使用
		if count, ok := memo[n]; ok {
			totalCount += count
			continue
		}

		// 再帰/反復計算
		currentN := n
		steps := 0
		path := make([]int, 0) // 計算過程を記録してメモ化に利用

		for currentN != 1 {
			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1に到達するまでの手数は、最後に1を足す
		steps++

		// メモ化
		// 逆順に計算した過程をメモ化する（または、元のnから1までの最短パスを求める）
		// 今回は、元のnから1に到達するまでのステップ数を求めるので、再帰的または反復的に計算したstepsを保存する
		memo[n] = steps
		totalCount += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（今回は無視しても良いが、念のため）
	}

	fmt.Printf("total=%d\n", totalCount)
}
