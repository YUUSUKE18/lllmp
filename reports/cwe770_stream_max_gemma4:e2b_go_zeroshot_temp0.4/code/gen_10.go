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

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の最小値より小さい値で初期化（最大値を求めるため）

	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
