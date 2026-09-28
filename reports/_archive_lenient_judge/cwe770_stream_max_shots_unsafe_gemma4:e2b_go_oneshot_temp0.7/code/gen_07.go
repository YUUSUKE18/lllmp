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
		// 入力が空の場合は何も出力しない
		return
	}

	line := scanner.Text()
	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値（実際には負の無限大に相当させる）
	found := false

	for _, field := range fields {
		// 前後の空白を削除
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	// 要素が存在する場合のみ結果を出力
	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
