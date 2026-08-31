package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(nil) // nil になるため、標準入力から読み込む必要があるが、Go の標準ライブラリでは直接 reader を指定できない。代わりに bufio.NewReader(os.Stdin) を使うか、または fmt.Scanf を使用して文字列を解析する。
	// 問題文の要件「標準ライブラリのみを使う」かつ「標準入力」という条件から、os パッケージは必要ないが、bufio は標準ライブラリに含まれる。
	// しかし、fmt.Scanf が最もシンプルで安全であるため、それを採用する。

	var input string
	fmt.Scan(&input) // 1 つの行を読み取る（問題文では「受け取ります」とあり、通常は 1 行と仮定）

	count := 0
	sum := int64(0)

	// "値:回数" をカンマ区切りで解析する
	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// 形式 "値:回数" を検証する
		pairParts := strings.SplitN(part, ":", 2)
		if len(pairParts) != 2 {
			continue // 形に一致しない場合は無視
		}

		valStr := strings.TrimSpace(pairParts[0])
		countStr := strings.TrimSpace(pairParts[1])

		if valStr == "" || countStr == "" {
			continue
		}

		val, errVal := strconv.ParseInt(valStr, 10, 64)
		if errVal != nil {
			continue // 値が整数でない場合は無視
		}

		countNum, errCount := strconv.Atoi(countStr) // 回数は int で十分（0 以上）
		if errCount != nil {
			continue
		}

		if countNum < 0 {
			continue // 回数は 0 以上である必要がある
		}

		count += countNum
		sum += val * int64(countNum)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
