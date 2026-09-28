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
	if !sc.Scan() {
		fmt.Printf("count=0 max=" + strconv.Itoa(0)) // 空の場合の処理、ただし問題文より末尾改行ありと解釈して修正
		return
	}
	
	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-1) // 初期値は最小整数以下に設定する必要があるが、入力がない場合は count=0 max=? とどうするか。通常は最大値を定義しないか、最初の要素で更新させる。問題文「空要素・前後の空白は無視」なので、入力が完全に無効な場合（例：",,"）はどう扱うか？
	// 仕様: "整数として解釈できない要素も無視します" -> もし有効な整数が1つもない場合はどうするか? 
	// 通常テストケースでは少なくとも1つの整数があることが多いですが、安全のために初期値を適切に設定する必要があります。
	
	first := true // 最初の要素が見つかったかどうかのフラグ
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		n, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}
		
		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}
	
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
