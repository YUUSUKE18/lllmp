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
	
	// 1行目から読み取る (整数として解釈可能)
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値が「読み取る整数の個数」
	countStr := strings.TrimSpace(sc.Text())
	
	// 2行目以降の整数を読み取る
	var sum int64 = 0
	var actualCount int = 0
	
	// 2行目以降の行を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		// 行が整数であるか試みる
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		
		// 読み取れた整数のみを対象とする
		sum += n
		actualCount++
	}
	
	// 最終的な結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
