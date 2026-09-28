package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	count := 0
	sum := 0
	firstLine := os.Args[0]

	if len(firstLine) == 0 {
		fmt.Println("0 0")
		return
	}

	// 第一線を解析する
	if err := strconv.Atoi(firstLine); err != nil {
		// 第一線が数値でない場合は、その行を無視
		return
	}

	// 前後の行をチェックする
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if len(line) == 0 {
			continue
		}

		// 値をチェックする
		if val, err := strconv.Atoi(line); err != nil {
			continue
		}

		// 値が64bit整数の範囲に収まっているかをチェックする
		if val < -1000000000 || val > 1000000000 {
			continue
		}

		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
