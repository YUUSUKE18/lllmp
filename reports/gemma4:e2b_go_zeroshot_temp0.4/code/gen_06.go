package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用 (重複排除と合計計算のため)
	uniqueNumbers := make(map[int]bool)
	var totalSum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として解析を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			totalSum += int64(num)
		}
	}

	// 個数を取得 (マップの要素数)
	count := len(uniqueNumbers)

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
