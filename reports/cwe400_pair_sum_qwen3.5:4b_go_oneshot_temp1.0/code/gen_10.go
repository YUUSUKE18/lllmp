package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	lineCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if lineCount == 0 {
			target = num
		} else {
			countPairs(num, target, &seen)
		}
		lineCount++
	}

	fmt.Printf("pairs=%d\n", count)
}

var seen map[int64]int
var count int64

func main2() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var numbers []int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if len(numbers) == 0 {
			target = num
		} else {
			countPairs(num, target, &seen)
		}
		numbers = append(numbers, num)
	}

	fmt.Printf("pairs=%d\n", count)
}

func countPairs(current int64, target int64, seen *map[int64]int) {
	for _, n := range *seen {
		complement := target - n
		if complement >= 0 { // 負の数は考慮しない（入力は整数なので補完も整数）
			if complement == current {
				continue // 同じ要素を使用しないため
			}
			if n < complement && countPairs(n, target, seen) != nil { // ここはロジック修正が必要だが、単一関数に収めるため再考
				return
			}
		}
	}
}
