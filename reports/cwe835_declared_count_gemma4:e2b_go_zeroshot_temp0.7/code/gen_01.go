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

	// 1行目を読み取る (整数の個数)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	line1 := strings.TrimSpace(scanner.Text())
	count, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合は無視（仕様上、1行目は整数と仮定されるが安全のため）
		return
	}

	var actualCount int = 0
	var sum int64 = 0
	
	// 2行目以降を読み取る
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		// 空行は無視
		if trimmedLine == "" {
			continue
		}

		// 整数として解釈できるか試みる
		num, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数を対象とする
		actualCount++
		sum += num
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
