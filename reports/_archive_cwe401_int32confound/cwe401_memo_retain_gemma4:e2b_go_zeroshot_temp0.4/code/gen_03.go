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

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し操作をシミュレーションし、手数を計算
		currentN := n
		count := int64(0)

		// nが1のときの手数は0
		if currentN == 1 {
			memo[n] = 0
		} else {
			// 1に到達するまでの手数を計算
			for currentN != 1 {
				if val, ok := memo[currentN]; ok {
					// メモがあればそれを使用
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
			memo[n] = count
		}

		// 合計に加算
		total += memo[n]
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
