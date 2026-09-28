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
	inputLine := scanner.Text()

	// カンマで分割する
	parts := strings.Split(inputLine, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 64bit整数の最小値より小さい値で初期化

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として解釈できるか試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できないものは無視
		}

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
