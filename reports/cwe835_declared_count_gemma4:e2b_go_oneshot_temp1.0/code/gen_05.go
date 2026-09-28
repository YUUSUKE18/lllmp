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
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}

	// 最初の行から個数を読み取る
	line1 := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が整数でなかった場合、読み取れた個数は0とする
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	actualCount := 0
	lineNum := 2

	// 2行目以降から整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
			continue
		}

		// 実際に読み取れた整数が指定された個数を超えたら終了
		if actualCount >= count {
			break
		}

		// 整数として解析を試みる
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた数のみを対象とする
		sum += num
		actualCount++
		lineNum++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
