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
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（ここではシンプルにstdin全体を扱うため、実際にはbufio.Scannerを使う方が一般的だが、今回はカンマ区切りの文字列として処理する）
	if err != nil {
		// エラー処理は省略し、想定通りに動作すると仮定する
		return
	}
	data := string(input)

	// カンマで分割して整数列を取得
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := len(uniqueNumbers)

	// 指定された形式で結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
