package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var steps int64 = 0
		currentN := n

		// nが1のときの手数は0
		if currentN == 1 {
			memo[n] = 0
		} else {
			// 1に到達するまでの手数を計算
			for currentN != 1 {
				// メモ化された値があればそれを使用
				if val, ok := memo[currentN]; ok {
					steps = val
					break
				}

				// 操作の適用
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
			memo[n] = steps
		}

		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
