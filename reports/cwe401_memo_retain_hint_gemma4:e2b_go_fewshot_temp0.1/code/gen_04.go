package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 再帰的または反復的に操作を計算し、メモ化を利用する
		if n == 1 {
			// nが1のときの手数は0
			memo[n] = 0
		} else if _, ok := memo[n]; !ok {
			// メモしておらず、かつnが1でない場合、計算を実行する
			currentN := n
			steps := int64(0)

			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
			memo[n] = steps
		}

		// 合計に加算
		total += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
