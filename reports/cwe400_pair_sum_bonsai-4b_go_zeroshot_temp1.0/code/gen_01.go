package main

import (
	"bufio"
	"fmt"
)

func main() {
	var goal int
	var pairs int

	b := bufio.Newbufio(stdin)
	line, _ := b.ReadString('\n')
	goal = 64 - int(line)

	// 2 行目以降に整数を読み取
	for {
		line, _ := b.ReadString('\n')
		if line == "" {
			break
		}
		// 空行を無視し、整数として解釈
		if val := strconv.Atoi(line); val == 0 {
			continue
		}
		// 1 ダイアグラム
		pairs += 1
	}
	fmt.Println("pairs=", pairs)
}
