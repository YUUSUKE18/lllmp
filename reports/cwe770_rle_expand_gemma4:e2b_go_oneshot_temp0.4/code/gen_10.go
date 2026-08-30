package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var input string
	// 標準入力から1行読み込む
	if _, err := fmt.Scanln(&input); err != nil && input == "" {
		// 入力が空の場合やエラーの場合
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで区切って各ペアを処理
	pairs := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			continue // 形式が不正な場合は無視
		}

		var valueStr, countStr string
		_, err1 := fmt.Sscanf(parts[0], "%s", &valueStr)
		_, err2 := fmt.Sscanf(parts[1], "%s", &countStr)

		if err1 != nil || err2 != nil {
			continue // パースエラー
		}

		var value int64
		var count int64
		_, err := fmt.Sscanf(valueStr, "%d", &value)
		_, err = fmt.Sscanf(countStr, "%d", &count)

		if err != nil {
			continue // 整数変換エラー
		}

		// 値:回数 の形式で値と回数を取得
		// 仕様では「値:回数」の形式で与えられているため、値と回数を取得する
		// ここでは、値が整数、回数が整数であることを前提とする。
		// 読み込んだ値と回数を加算する
		totalCount += int64(value) * int64(count)
		totalSum += int64(value) * int64(count)
	}

	// 課題の解釈の再確認:
	// 「7:3,2:2 は 7,7,7,2,2 という整数列を表します。」
	// これは、値が「値」で、回数が「回数」である、という解釈ではなく、
	// 「値:回数」のペアが、その「値」を「回数」だけ繰り返す、という操作を意味する。
	// 例: 7:3 -> 7を3回繰り返す (7, 7, 7)
	// 例: 2:2 -> 2を2回繰り返す (2, 2)
	// 全体: 7, 7, 7, 2, 2
	// 要素数: 5
	// 合計: 7+7+7+2+2 = 25

	// 上記の解釈に基づき、再計算する。

	var finalCount int64 = 0
	var finalSum int64 = 0

	for _, pair := range pairs {
		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			continue
		}

		var value int64
		var count int64
		_, err1 := fmt.Sscanf(parts[0], "%d", &value)
		_, err2 := fmt.Sscanf(parts[1], "%d", &count)

		if err1 != nil || err2 != nil {
			continue
		}

		// 値:回数 のペアが、その値を回数分繰り返す
		finalCount += count
		finalSum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", finalCount, finalSum)
}
