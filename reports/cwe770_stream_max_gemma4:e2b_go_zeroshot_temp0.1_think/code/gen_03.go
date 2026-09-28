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
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラー処理（EOFは正常終了として扱う）
		return
	}

	// 入力文字列から改行文字などを除去し、カンマ区切りの文字列を取得
	input = strings.TrimSpace(input)
	if input == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで分割して要素のリストを得る
	parts := strings.Split(input, ",")

	count := 0
	// 最大値を保持する。初期値は0とする。
	// 0が最大値になる可能性があるため、負の数を含む入力に対応するため、
	// 最初の有効な値が見つかるまで特別なフラグを使うか、
	// 最小値で初期化するが、ここではcountが0の場合にmaxも0とする方針を採用する。
	maxVal := 0 
	foundValid := false

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)

		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として解析を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 有効な整数が見つかった
		count++
		if val > maxVal {
			maxVal = int64(val)
		}
		foundValid = true
	}

	// 結果を出力
	// countが0の場合、maxは0として出力する
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
