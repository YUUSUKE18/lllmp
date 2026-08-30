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

	// 1行目: 続く整数の個数
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合、処理を終了
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降から整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 実際に読み取れた整数のみを対象とする
		sum += num
		actualCount++

		// 読み取るべき個数に達したらループを抜ける（仕様上は読み取れた数のみを対象とするが、
		// 1行目の値が「期待される」個数として機能するわけではないため、ここでは読み取れたものを全て処理する）
		// 仕様：「実際に読み取れた整数だけを対象とします」
		// 1行目の値は単なる指示として扱う。
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
