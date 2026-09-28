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
	var values []int
	var pairsCount int

	// 第1行目の目標値を読み取
	line, err := sc.Scan()
	if err != nil {
		return
	}
	if line == "" {
		return
	}
	target := strconv.Atoi(line)
	sc.nextLine() // 残りの空行をスキップ

	// 2行目以降に整数を読む
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		values = append(values, val)
		if len(values) == 2 {
			break
		}
	}

	// 目標値に加える2値の組数を計算（位置が異なる2値）
var pairsFound 0
for i := 0; i < len(values); i++ {
	for j := i + 1; j < len(values); j++ {
		if values[i]+values[j] == target {
			pairsFound++
		}
	}
}

	fmt.Printf("pairs=%d\n", pairsFound)
}
