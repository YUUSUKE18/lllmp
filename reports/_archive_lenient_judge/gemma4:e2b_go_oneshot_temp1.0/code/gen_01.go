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
	input, err := os.ReadFile(0) // os.Stdin の内容を直接読むための一般的な方法（ここではScanを使う方がよりGo的で適切）
	if err != nil {
		return
	}
	data := string(input)

	// カンマ区切りの整数列を読み込む
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ（セットとして機能させるため）
	uniqueNums := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複をチェックし、まだ追加されていない場合のみ処理する
		if !uniqueNums[num] {
			uniqueNums[num] = true
			sum += num
		}
	}

	count := len(uniqueNums)

	// 結果を厳密に指定された形式で出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
