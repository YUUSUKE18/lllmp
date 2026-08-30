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
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値を整数個数としてパース
	numCount, err := strconv.Atoi(sc.Text())
	if err != nil {
		// 1行目が整数でない場合は、読み取れた個数を0として扱う（仕様上、1行目は整数と仮定されるが、安全策として）
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
		
		// 行が整数であるかチェックし、整数としてパースする
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		
		// 読み取れた整数のみを対象とする
		totalSum += int(n)
		actualCount++
	}
	
	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
