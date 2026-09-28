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
	
	// 1行目を読み込み、実際に読み取れた整数の個数を取得する
	if !sc.Scan() {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}
	
	// 1行目の値は無視し、2行目以降の整数を読み取る
	// 1行目の値は「続く整数の個数」として扱われるが、実際に読み取れた個数を数える
	
	count := 0
	sum := int64(0)
	
	// 2行目以降を読み込む
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		// 行が整数として解釈できるか試みる
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			// 整数として読み取れた場合のみカウントと合計に加算
			count++
			sum += num
		}
	}
	
	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
