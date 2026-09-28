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
		return
	}
	line1 := sc.Text()
	count, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数がないとみなし終了
		return
	}
	
	totalSum := 0
	actualCount := 0
	
	// 2行目以降を読み込む
	for sc.Scan() {
		line := sc.Text()
		
		// 空行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}
		
		// 整数として解釈できるか試みる
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 実際に読み取れた整数のみを対象とする
		totalSum += int(num)
		actualCount++
	}
	
	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
