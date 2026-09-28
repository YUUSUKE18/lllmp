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

	// 1行目から整数個数を読み込む
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	line1 := strings.TrimSpace(sc.Text())
	count, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合は処理を終了（仕様上は想定されないが安全のため）
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降の整数を読み込む
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
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
