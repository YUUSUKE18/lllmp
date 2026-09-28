package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}

	line := scanner.Text()
	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 最小値を初期値として設定（データが存在しない場合に対応するため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
