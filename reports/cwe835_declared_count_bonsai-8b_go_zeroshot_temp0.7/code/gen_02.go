package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var countStr string
	var sumStr string

	// 第1行：整数の個数を入力
	countStr = os.Args[1]
	if _, err := strconv.Atoi(countStr); err != nil {
		countStr = ""
	}

	// 前後の行を読み取って、行ごとに整数を処理
	var actualCount int
	var actualSum int

	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if line == "" {
			continue
		}

		// 行の内容を整数に変換
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 異なる個数の場合は、実際の数を追加
		if i == 1 {
			if countStr == "" {
				// 最初の行が空または無効な場合は、0と0を出力
				fmt.Println("count=0 sum=0")
			} else {
				// countStrが有効な場合は、入力された数と一致させる
				if num == countStr {
					actualCount = num
					actualSum += num
				}
			}
		} else {
			// 前後が空または無効な場合は、0と0を出力
			if actualCount == 0 {
				fmt.Println("count=0 sum=0")
			} else {
				actualSum += num
			}
		}
	}

	// 結局の出力
	fmt.Printf("count=%d sum=%d\n", actualCount, actualSum)
}
