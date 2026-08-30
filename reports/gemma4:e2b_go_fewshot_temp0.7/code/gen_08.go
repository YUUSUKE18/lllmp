package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力全体を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーが発生した場合は終了
		return
	}
	data := string(input)

	// カンマで分割して文字列のリストを得る
	parts := strings.Split(data, ",")

	// 重複を除いた整数を格納するためのマップと合計値
	seen := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視
			continue
		}

		// 重複チェックと合計の計算
		if !seen[n] {
			seen[n] = true
			sum += n
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", len(seen), sum)
}
