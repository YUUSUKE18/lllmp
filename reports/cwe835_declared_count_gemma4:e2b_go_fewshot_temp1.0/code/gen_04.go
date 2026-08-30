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
		// 入力が空の場合は何もしない
		return
	}
	
	numCountStr := strings.TrimSpace(sc.Text())
	
	// 最初の値は整数個数として扱う
	initialCount, err := strconv.ParseInt(numCountStr, 10, 64)
	if err != nil {
		// 最初の行が数値でない場合は処理を終了
		return
	}
	
	actualCount := int(initialCount)
	sum := int64(0)
	
	// 2行目以降の整数を読み込む
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
	
	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
