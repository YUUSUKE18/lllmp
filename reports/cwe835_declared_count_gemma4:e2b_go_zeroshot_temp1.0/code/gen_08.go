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

	// 1行目: 続く整数の個数が書かれている
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目の値が整数でない場合は処理を終了（仕様上は想定されないが安全策）
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降の整数を読み取る
	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}

		// 整数として解釈を試みる
		num, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数を対象とする (仕様: 実際に読み取れた整数だけを対象)
		sum += num
		actualCount++
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
