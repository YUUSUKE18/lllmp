package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdinReader)
	target := 0
	scanner.Scan() // 目標値を読み込み
	if line, ok := scanner.Text(); ok {
		// 目標値が整数でなければエラー处理，但仕様では標準入力への入力が想定されているため簡易的に float64->int64
		var err error
		target, err = strconv.ParseInt(line, 10, 64)
		if err != nil {
			panic("目標値は整数でなければなりません")
		}
	}

	counters := make([]int32, 1<<31) // 31-bit signed int range
	found := 0

	scanner.Scan()
	for scanner.Scan() {
		line, _ := scanner.Text()
		if line == "" || !isInteger(line) {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		// val が目標値 + val で存在するかチェック (val+target)
		exist := counters[val + target]
		counters[val]++

		// pair を追加する
		found += exist
	}

	fmt.Printf("pairs=%d\n", found)
}

func isInteger(s string) bool {
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}
