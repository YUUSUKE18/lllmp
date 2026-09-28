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

	// 1行目: 続く整数の個数
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	line1 := strings.TrimSpace(sc.Text())
	count, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合、読み取れた個数は0とする
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降: 整数を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		sum += n
		actualCount++

		// 読み取るべき個数に達したらループを抜ける
		if actualCount == count {
			break
		}
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
