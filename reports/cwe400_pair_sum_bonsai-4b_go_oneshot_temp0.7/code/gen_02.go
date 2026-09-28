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
	for _, line := range sc.Lines() {
		t, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		target = t
	}
	// 2行目以降：整数
	for _, line := range sc.Lines() {
		// 空行は無視
		if line == "" {
			continue
		}
		// 整数として解析
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		// 2値の組が目標値に加えると符合条件
		if val >= target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
