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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む（ここではより安全な方法として、bufio.Readerを使う方が一般的だが、今回はシンプルにファイル読み込みで対応）
	if err != nil {
		// 読み込みエラーが発生した場合は終了
		return
	}
	inputStr := string(input)

	// カンマで分割して整数列を取得
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	count := 0
	maxValue := int64(0)
	foundNumber := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
		foundNumber = true
	}

	// 1行だけ出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
