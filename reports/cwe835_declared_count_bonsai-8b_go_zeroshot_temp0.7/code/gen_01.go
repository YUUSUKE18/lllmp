package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	countStr := ""
	sumStr := ""
	for _, line := range os.ReadLines(os.Stdin) {
		if countStr == "" {
			// 第1行：個数を取得
			if s, err := strconv.Atoi(line); err == nil {
				countStr = fmt.Sprintf("%d", s)
			}
		} else {
			// 前後が空行の場合はリセット
			if line == "" {
				countStr = ""
				sumStr = ""
				continue
			}
			// 次の整数を読み取る
			if val, err := strconv.Atoi(line); err == nil {
				sumStr += fmt.Sprintf("%d ", val)
			}
		}
	}

	// 空の場合、標準出力に何もしない
	if countStr == "" {
		return
	}

	count, _ := strconv.Atoi(countStr)
	sum, _ := strconv.Atoi(sumStr)

	// 実際の数と合計を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
