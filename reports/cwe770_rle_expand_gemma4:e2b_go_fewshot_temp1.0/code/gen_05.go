package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		// 標準入力が空または読み込みエラーの場合、何も出力しない（仕様上は想定されないが安全のため）
		return
	}

	inputStr := string(input)
	
	// 空白で分割して各要素を処理
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// ": " で分割して値と回数を取得
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数として有効かチェック
		value, errV := fmt.Sscanf(valueStr, "%d", &value)
		count, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV != nil || errC != nil || value == 0 || count == 0 {
			// 値や回数が整数として解析できなかった、または回数が0の場合は無視
			continue
		}

		// 値 * 回数を計算し、合計と要素数を更新
		totalCount += int64(count)
		totalSum += int64(value) * int64(count)
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
