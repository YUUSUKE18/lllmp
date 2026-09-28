package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	countStr := os.Args[0]
	sumStr := "0"

	count, err := strconv.Atoi(countStr)
	if err != nil {
		return
	}

	// リアルの整数を読み取る
	var numbers []int
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if l, err := strconv.Atoi(line); err == nil {
			numbers = append(numbers, l)
		}
	}

	// 真の個数と合計を計算
	trueCount := len(numbers)
	trueSum := sumStr
	for _, num := range numbers {
		trueSum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", trueCount, trueSum)
}
