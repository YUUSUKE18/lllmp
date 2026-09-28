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
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 個数の読み取りに失敗した場合は終了
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降: 整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		sum += num
		actualCount++

		// 読み取るべき個数に達したらループを抜ける
		if actualCount == count {
			break
		}
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
