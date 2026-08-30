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
	var maxValue int64 = -1 // 64bit整数の最小値として初期化。負の数も考慮するため、非常に小さな値で初期化する。

	// 空要素や数値でない要素を無視し、最大値を計算する
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈可能か試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視する
			continue
		}

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
