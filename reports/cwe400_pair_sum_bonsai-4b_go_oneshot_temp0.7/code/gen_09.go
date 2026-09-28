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
	// 第1行は目標値
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

	// 2行目以降は整数
	for line := range sc {
		line, err := sc.Scan()
		if err != nil {
			return
		}
		if line == "" {
			continue
		}
		if err := strconv.Atoi(line); err != nil {
			continue
		}
		if target+line == 0 {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
