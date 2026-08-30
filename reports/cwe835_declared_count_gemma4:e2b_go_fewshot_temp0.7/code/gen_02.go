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
	
	// 1行目の値（期待される個数）を読み込む
	expectedCountStr := sc.Text()
	expectedCount, err := strconv.Atoi(expectedCountStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数は0個とする
		fmt.Println("count=0 sum=0")
		return
	}
	
	actualCount := 0
	sum := int64(0)
	
	// 2行目以降を読み込む
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
		actualCount++
		sum += n
	}
	
	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
