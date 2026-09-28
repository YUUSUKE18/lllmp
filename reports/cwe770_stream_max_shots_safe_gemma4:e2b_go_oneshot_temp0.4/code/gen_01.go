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
	// 標準入力から一行を読み込む
	_, err := fmt.Scanln(&input)
	if err != nil && err.Error() != "unexpected newline" {
		// エラーが発生した場合（例：空入力など）は処理を終了
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(input, ",")

	count := 0
	var max int64 = -1 // 64bit整数の範囲を考慮し、初期値を非常に小さい値に設定
	foundValid := false

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 有効な整数が見つかった場合
		count++
		if val > max {
			max = val
		}
		foundValid = true
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
