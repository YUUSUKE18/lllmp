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
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	countStr := strings.TrimSpace(sc.Text())
	initialCount, err := strconv.ParseInt(countStr, 10, 64)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数は0として扱う（あるいはエラー処理を厳密に行うが、ここでは読み取れたもののみを対象とする）
		// 仕様に従い、読み取れた整数のみを対象とするため、ここでは処理を続ける。
	}
	
	var actualCount int64 = 0
	var sum int64 = 0
	
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
		actualCount++
		sum += n
	}
	
	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
