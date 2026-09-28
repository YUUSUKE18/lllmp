package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	var goal int

	// 首の行が目標値
	for _, line := range sc.Lines() {
		if len(line) > 0 {
			// 目的値を読み取
			_, err := strconv.Atoi(line[0])
			if err != nil {
				continue
			}
			goal = err == nil ? int(line[0]) : 0
		}
	}

	// その他全ては整数として解析
	for _, line := range sc.Lines() {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n > 0 {
			numbers = append(numbers, n)
		}
	}

	// 目的値に達する2組の位置を検索
	var pairs int
	// 2番目に开始する各組を検索
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == goal {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
