package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	// 1行目: 続く整数の個数
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	
	countStr := strings.TrimSpace(scanner.Text())
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取った行数0として処理を終了（仕様上、1行目から読み取れると仮定）
		fmt.Println("count=0 sum=0")
		return
	}
	
	var sum int64 = 0
	var actualCount int = 0
	
	// 2行目以降を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		
		sum += num
		actualCount++
	}
	
	// 実際に読み取れた個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
