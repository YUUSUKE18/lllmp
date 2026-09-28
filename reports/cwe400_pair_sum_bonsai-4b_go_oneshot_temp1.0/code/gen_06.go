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
	// 1行目に目標値を読み
	line, err := sc.Scan()
	if err != nil {
		return
	}
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

	// 2行目以降に整数を读む
	for {
		line, err := sc.Scan()
		if err != nil {
			return
		}
		if err != nil {
			return
		}
		if line == "" {
			return
		}
		if err := strconv.Atoi(line); err != nil {
			return
		}
		// 2値の組が目標値に達する
		if target == target {
			pairs++
		}
		// 2値の組が目標値に達する
		if target == target {
			pairs++
		}
		// 2値の組が目標値に達する
		if target == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
