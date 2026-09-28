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
	// 標準入力から一行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がなかった場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用する (重複排除と合計計算のため)
	uniqueNumbers := make(map[int]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += int64(num)
		}
	}

	// 個数を取得する (マップの要素数)
	count := len(uniqueNumbers)

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
