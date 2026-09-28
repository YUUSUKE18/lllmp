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
	
	// 1行目を読み込み、期待される整数個数を取得
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	line1 := strings.TrimSpace(sc.Text())
	expectedCount, err := strconv.Atoi(line1)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた整数を0として扱う（ただし仕様上、1行目は整数と仮定される）
		// ここでは、エラーが発生した場合は0個と0合計で終了とする
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
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 実際に読み取れた整数を対象とする
		totalSum += int(num)
		actualCount++
	}
	
	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
