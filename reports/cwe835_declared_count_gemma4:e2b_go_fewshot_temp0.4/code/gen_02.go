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
	
	countStr := strings.TrimSpace(sc.Text())
	numCount, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合、読み取れた数0として処理を終了する（仕様に厳密に従うため）
		fmt.Println("count=0 sum=0")
		return
	}
	
	totalSum := 0
	actualCount := 0
	
	// 2行目以降を読み込む
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		
		// 実際に読み取れた整数のみを対象とする
		totalSum += int(n)
		actualCount++
	}
	
	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
