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
		// 入力が空の場合は何も出力しない（仕様上は入力がある前提だが念のため）
		return
	}

	line := scanner.Text()
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（実質的な負の無限大として扱う）
	found := false

	for _, field := range fields {
		// 前後の空白をトリム
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
		found = true
	}

	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数として有効な要素が一つもなかった場合（空行や無効なデータのみの場合）
		// このケースの具体的な出力要件はないが、ここでは0個最大値=未定義として扱うか、あるいは何も出力しないかの判断が必要。
		// 通常は入力された数に基づき処理するため、有効な要素がない場合は count=0 max=（何らかのデフォルト値）となる。
		// 今回は「整数として解釈できない要素も無視する」ため、有効な数が0個ならcount=0, max=0とするのが自然か。
		fmt.Printf("count=0 max=0\n")
	}
}
