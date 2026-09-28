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
		// 入力が空の場合は何も出力しない
		return
	}
	line := scanner.Text()

	// カンマで分割して整数を抽出
	fields := strings.Split(line, ",")
	count := 0
	maxValue := int64(0)
	foundNumber := false

	for _, field := range fields {
		// 前後の空白を削除
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
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
		foundNumber = true
	}

	// 処理した要素が一つもなかった場合は、count=0, max=0 とする（仕様上は空入力の場合の挙動だが、ここでは読み込んだものに基づいて出力）
	if !foundNumber && len(strings.TrimSpace(line)) > 0 {
		// 入力があったがすべて無効な場合、count=0, max=0 または適切なデフォルト値を出力する。
		// ここでは読み取れた有効な数値がない場合は count=0, max=0 とする。
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
