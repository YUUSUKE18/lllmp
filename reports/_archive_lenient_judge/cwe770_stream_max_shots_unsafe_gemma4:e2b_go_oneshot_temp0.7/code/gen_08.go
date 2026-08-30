package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何も出力しない（またはエラー処理）
		return
	}

	line := scanner.Text()
	// カンマで分割して文字列のスライスを得る
	fields := strings.Split(line, ",")

	count := 0
	var maxValue int64 = -1 // 64bit整数の最小値より小さくなるように初期化

	for _, field := range fields {
		// 前後の空白をトリム
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
