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
	var count int
	var sum int64
	actualCount := 0

	// 1行目を読み取る
	if scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行の場合は続行
		} else {
			// 1行目の値が整数の個数
			if c, err := strconv.Atoi(line); err == nil {
				count = c
			} else {
				// 1行目が整数でない場合は、読み取った整数を無視する（仕様上は1行目が整数と仮定されるが、安全のため）
			}
		}
	}

	// 2行目以降を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数として解釈を試みる
		if val, err := strconv.ParseInt(line, 10, 64); err == nil {
			// 整数として読み取れた場合、合計に加算し、実際に読み取れた個数をカウントする
			sum += val
			actualCount++
		}
		// 整数として解釈できない行は無視される
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
