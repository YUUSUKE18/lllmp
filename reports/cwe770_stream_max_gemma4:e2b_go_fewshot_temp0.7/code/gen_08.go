package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		// 入力が空の場合は何も出力しない（またはエラー処理を考慮するが、ここでは単に終了）
		return
	}
	line := sc.Text()

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値

	// カンマで分割して各要素を処理する
	fields := strings.Split(line, ",")
	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
