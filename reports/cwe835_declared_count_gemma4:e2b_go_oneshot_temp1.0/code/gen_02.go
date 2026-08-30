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
	line1 := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が数値でない場合は何も出力しない（仕様に厳密に従う）
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降: 整数を読み取る
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

		sum += num
		actualCount++
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
