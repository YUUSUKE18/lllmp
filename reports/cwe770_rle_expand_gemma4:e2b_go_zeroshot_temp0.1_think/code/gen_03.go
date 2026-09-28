package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		// エラー処理（通常、競技プログラミング環境では入力は保証されているが念のため）
		return
	}

	data := strings.TrimSpace(string(input))
	if data == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで区切って各要素に分割する
	segments := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, segment := range segments {
		segment = strings.TrimSpace(segment)
		if segment == "" {
			continue
		}

		// コロンで分割して値と回数を取得する
		parts := strings.Split(segment, ":")
		if len(parts) != 2 {
			// 形式が不正な場合は無視する
			continue
		}

		// 値と回数を int64 に変換する
		var value int64
		var count int64

		_, errV := fmt.Sscan(parts[0], &value)
		_, errC := fmt.Sscan(parts[1], &count)

		if errV != nil || errC != nil {
			// 変換エラーが発生した場合は無視する
			continue
		}

		// 合計に加算する
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
