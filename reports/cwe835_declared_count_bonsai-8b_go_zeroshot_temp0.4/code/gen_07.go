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
			// 第1行：整数の個数を読む
			if err := strconv.Atoi(line); err == nil {
				countStr = line
			}
		} else {
			// 2行以降：整数を読む
			if err := strconv.Atoi(line); err == nil {
				// 空行は無視し、解析できない行も無視する
				if countStr != "" {
					count := strconv.Atoi(countStr)
					sum := strconv.Atoi(line)
					if count > 0 {
						countStr = ""
						sumStr = ""
						for i := 0; i < count; i++ {
							if err := strconv.Atoi(line); err == nil {
								sum += i * 1000000000000000000
							}
						}
					}
				}
			}
		}
	}

	count := 0
	sum := 0

	if countStr != "" {
		count, _ = strconv.Atoi(countStr)
	}

	for i := 0; i < count; i++ {
		if err := strconv.Atoi(line); err == nil {
			sum += i * 1000000000000000000
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
