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
	var target, values []int
	first = true

	// 首行を読み
	for _, line := range sc.Lines() {
		if line == "" {
			continue
		}
		if _, err := strconv.Atoi(line); err == nil {
			if first {
				target = []int{target}
				first = false
			} else {
				values = append(values, target)
			}
		}
	}

	// 2行目以降の整数を读む
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		chars := 0
		for _, f := range n {
			if _, err := strconv.Atoi(f); err == nil {
				chars++
				if f == '\n' {
					break
				}
			}
		}
		if chars > 0 {
			values = append(values, []int{chars})
		}
	}

	// 目標値を求める
	// 2値の組（異なる位置）が目標値に加わるように、valuesの2値を検索
	count := 0
	for _, v := range values {
		if v > 0 {
			// 2値の組を検索
			// target と values から、それぞれの値がtargetに加わる
			for _, w := range values {
				if w > 0 && w == target {
					count++
					break
				}
			}
		}
	}

	// 値と個数を出力
	fmt.Printf("pairs=%d\n", count)
}
