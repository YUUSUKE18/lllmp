package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int
	var sum int64
	
	// 1 行目に整数の個数を読み取るが、実際にはその値を基準にせず、
	// 実際に読み取れる整数の数だけ処理する。
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	// 最初の行（個数の宣言）はスキップし、次から整数を読み取る
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// 空行は無視
		if len(line) == 0 || line[0] == '\n' {
			continue
		}
		
		// 文字列を整数に変換し、失敗した場合は無視
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		count++
		sum += val
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
