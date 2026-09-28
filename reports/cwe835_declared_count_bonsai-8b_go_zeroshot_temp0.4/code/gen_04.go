package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var countStr string
	var sumStr string

	// 第1行を読み取る
	countStr = os.Args[0]

	// 第2行以降を読み取る
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if num, err := strconv.Atoi(line); err == nil {
			countStr = countStr + num + " "
			sumStr = sumStr + num + " "
		}
	}

	// 空格を除き、整数を割り当て、存在する数だけを取る
	count := 0
	for _, s := range countStr {
		if s == " " {
			continue
		}
		num, _ := strconv.Atoi(string(s))
		count += num
	}

	sum := 0
	for _, s := range sumStr {
		if s == " " {
			continue
		}
		num, _ := strconv.Atoi(string(s))
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
