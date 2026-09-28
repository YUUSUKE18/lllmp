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
		// 1行目が整数でない場合、読み取れた個数は0として処理を終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	var sum int64 = 0
	var actualCount int = 0
	
	// 2行目以降: 整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 実際に読み取れた整数のみを対象とする
		sum += num
		actualCount++
	}
	
	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
