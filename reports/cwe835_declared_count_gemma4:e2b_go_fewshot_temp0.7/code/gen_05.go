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
	
	// 1行目を読み込み、整数として個数を取得
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	
	countStr := strings.TrimSpace(sc.Text())
	initialCount, err := strconv.ParseInt(countStr, 10, 64)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数は0として扱う（またはエラー処理に応じて調整）
		fmt.Println("count=0 sum=0")
		return
	}
	
	totalSum := int64(0)
	actualCount := 0
	
	// 2行目以降を読み込み、整数を処理
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		totalSum += n
		actualCount++
	}
	
	// 指定された形式で結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
