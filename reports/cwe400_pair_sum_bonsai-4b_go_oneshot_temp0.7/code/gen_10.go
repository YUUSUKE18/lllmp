package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var count 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	
	for sc.Next() {
		// 長さ1の行は目標値
		if sc.Text().Trim() == "" {
			continue
		}
		t, err := strconv.Atoi(sc.Text().Trim())
		if err != nil {
			continue
		}
		target = t
	}
	
	// 2行目以降の整数を読み
	for sc.Next() {
		if sc.Text().Trim() == "" {
			continue
		}
		n, err := strconv.Atoi(sc.Text().Trim())
		if err != nil {
			continue
		}
		// 目標値とこの数を組み合わせて目標値になる
		if n == target {
			count++
		}
	}
	
	fmt.Printf("pairs=%d\n", count)
}
