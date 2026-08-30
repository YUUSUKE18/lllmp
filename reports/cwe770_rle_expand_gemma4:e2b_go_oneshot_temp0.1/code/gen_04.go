package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで区切って個々の "値:回数" のペアに分割
	pairs := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		parts := strings.Split(strings.TrimSpace(pair), ":")
		if len(parts) != 2 {
			continue
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(parts[0], "%d", &value)
		_, errC := fmt.Sscanf(parts[1], "%d", &count)

		if errV != nil || errC != nil {
			continue
		}

		// 値:回数 の形式で読み取れた場合
		totalCount += count
		totalSum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
