package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	// 標準入力から1行読み込む
	if _, err := fmt.Scanln(&input); err != nil && err.Error() != "unexpected newline" {
		// エラーが発生した場合（EOFなど）は無視して続行または終了
		return
	}

	// カンマで分割し、空白を除去しながら整数を抽出する
	parts := strings.Split(input, ",")
	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (十分大きな正の数)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を厳密に指定の形式で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
