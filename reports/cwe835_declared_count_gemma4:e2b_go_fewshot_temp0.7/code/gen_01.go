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
	
	// 1行目: 読み取れた整数個数
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値（整数個数）を読み取る
	line1 := strings.TrimSpace(sc.Text())
	expectedCount, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でなかった場合、読み取れた数を0として扱う
		fmt.Println("count=0 sum=0")
		return
	}

	totalSum := 0
	actualCount := 0

	// 2行目以降を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		
		totalSum += int(n)
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
