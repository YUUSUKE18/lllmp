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

	// 1行目から整数が読み取れるか試みる（個数）
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := strings.TrimSpace(scanner.Text())
	count, err := strconv.Atoi(countStr)

	// countの読み取りに失敗した場合は、以降の処理をスキップまたはエラーとして扱う（今回は仕様に従う）
	// ただし、countが読み取れなくても、続く行を読み続ける必要があるため、
	// 読み取れた整数のみを対象とするという要件を優先する。
	// 実際には、countは単なる最初の入力であり、読み取れた実数の個数に依存する。

	var sum int64 = 0
	actualCount := 0

	// 2行目以降の整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数のみを対象とする
		sum += num
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
