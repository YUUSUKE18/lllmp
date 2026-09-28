package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdinの読み込みを直接行うため、ここでは便宜上ファイルディスクリプタ0を使用
	if err != nil {
		// エラー処理（通常、競技プログラミング環境では標準入力からの読み込みが保証される）
		return
	}
	inputStr := string(input)

	// 入力をカンマで分割する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	// 重複を除いた整数を格納するためのマップ
	seen := make(map[int64]bool)
	var count int = 0
	var sum int64 = 0

	for _, part := range parts {
		// 各要素の前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと集計
		if !seen[num] {
			seen[num] = true
			count++
			sum += num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
