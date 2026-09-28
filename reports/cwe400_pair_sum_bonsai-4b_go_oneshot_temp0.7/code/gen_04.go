package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var pairCount 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	
	// 第1行が目標値
	line, err := sc.Scan()
	if err != nil {
		return
	}
	if line == "" {
		return
	}
	target, err := strconv.Atoi(line)
	if err != nil {
		return
	}

	// 2行目以降は整数
	for {
		line, err := sc.Scan()
		if err != nil {
			return
		}
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		// 目的値に加える n がtargetになる場合にカウントを増加
		if n == target {
			pairCount++
		}
	}
	fmt.Printf("pairs=%d\n", pairCount)
}
