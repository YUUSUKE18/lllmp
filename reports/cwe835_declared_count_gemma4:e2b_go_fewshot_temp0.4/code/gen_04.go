package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}

	// 1行目から期待される整数個数を読み込む
	line1 := sc.Text()
	expectedCount, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数は0として扱う
		fmt.Println("count=0 sum=0")
		return
	}

	var actualCount int
	var sum int64 = 0
	lineNum := 1

	// 2行目以降を読み込む
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 実際に読み取れた整数をカウントし、合計に加算する
		actualCount++
		sum += n
		lineNum++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
