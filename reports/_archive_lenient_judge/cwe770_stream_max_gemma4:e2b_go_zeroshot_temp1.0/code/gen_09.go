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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力がない場合は終了
	}

	line := scanner.Text()

	// カンマで分割して文字列の配列にする
	parts := strings.Split(line, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 64bit整数の最小値より小さい値で初期化

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)

		// 空文字列でないことを確認
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視する
			continue
		}

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を標準出力に出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
