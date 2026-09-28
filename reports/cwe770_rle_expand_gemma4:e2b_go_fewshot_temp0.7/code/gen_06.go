package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(os.Stdin.Name())
	if err != nil {
		// 標準入力から直接読み込む方が安全だが、例に従いファイル読み込みを試みる
		// 実際には bufio.Reader を使う方が標準的で安全
		return
	}
	inputStr := string(input)
	
	// 標準入力全体を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで区切って各要素を処理
	parts := strings.Split(line, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数としてパースできるか確認
		var value int64
		var count int64
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV == nil && errC == nil {
			// 値が正しくパースできた場合
			totalCount += int64(value) * int64(count)
			totalSum += int64(value) * int64(count)
		}
	}

	// 求められているのは「要素数」と「合計」
	// 仕様の解釈: 
	// 「値:回数」の列を読み、それらの要素（値）と回数（回数）から、
	// 実際の整数列（7,7,7,2,2）の要素数と合計を求めよ。
	// 例: 7:3,2:2 -> (7,7,7,2,2) という列。要素数=5, 合計=25
	
	// 上記のロジックは「値 * 回数」の合計を求めているため、
	// 求められているのは「生成される整数の総数」と「生成される整数の合計」であると解釈する。
	// 7:3 (7,7,7) -> 3回
	// 2:2 (2,2) -> 2回
	// 実際に生成される整数列: 7, 7, 7, 2, 2 (要素数 5, 合計 25)
	
	// 再計算:
	var actualCount int64 = 0
	var actualSum int64 = 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(kv[0], "%d", &value)
		_, errC := fmt.Sscanf(kv[1], "%d", &count)

		if errV == nil && errC == nil {
			// value が count 回繰り返される
			actualCount += count
			actualSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, actualSum)
}
