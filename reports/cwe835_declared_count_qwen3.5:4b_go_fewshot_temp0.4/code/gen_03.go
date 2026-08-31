package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countInput, _ := strconv.Atoi(sc.Scan()) // 1 行目の整数を読み込む（エラーは無視）

	var sum int64
	actualCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
		actualCount++
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
