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
		// 入力がない場合は終了
		fmt.Println("count=0 max=0")
		return
	}

	inputLine := scanner.Text()

	// カンマで分割して要素のリストを得る
	parts := strings.Split(inputLine, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の最小値として初期化（負の値も考慮するため）

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解析を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視する
			continue
		}

		// 有効な整数としてカウントと最大値を更新する
		count++
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	// countはint、maxValueはint64
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
