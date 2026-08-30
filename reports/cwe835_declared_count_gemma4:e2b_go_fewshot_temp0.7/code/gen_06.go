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
	
	// 1行目を読み取り、整数個数を取得
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	line1 := strings.TrimSpace(sc.Text())
	if line1 == "" {
		fmt.Println("count=0 sum=0")
		return
	}
	
	numCount, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数は0個とする
		fmt.Println("count=0 sum=0")
		return
	}
	
	totalSum := 0
	actualCount := 0
	
	// 2行目以降を読み取り、整数を処理
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
		
		// 実際に読み取れた整数のみを対象とする
		totalSum += int(n)
		actualCount++
	}
	
	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
