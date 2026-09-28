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
		// 入力が空の場合は何も出力しない（あるいはエラー処理を考えるが、ここでは仕様通り続行）
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を得る
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値（実質的には最初の有効な値で上書きされる）
	foundFirst := false

	for _, field := range fields {
		// 前後の空白をトリムして処理
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

		if !foundFirst || n > maxValue {
			maxValue = n
			foundFirst = true
		}
	}

	// 厳密に count=<個数> max=<最大値> の1行を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
