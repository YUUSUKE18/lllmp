package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var pairs int

func main() {
	sc := bufio.NewScanner(os.Stdin)
	// 第1行：目標値
	line, _ := sc.Scan()
	if _, err := strconv.Atoi(line); err != nil {
		return
	}
	target = line

	// 2行目以降：整数
	for {
		line, _ := sc.Scan()
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		if line == "" {
			continue
		}
		// 2つの異なる値が目標を上回る
		if target < line[0] && line[0] - line[0] == 0 {
			// 2値が異なる
			if line[0] - target > 0 {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
