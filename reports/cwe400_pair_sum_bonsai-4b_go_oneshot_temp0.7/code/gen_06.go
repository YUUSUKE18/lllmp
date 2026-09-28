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
	var pairs = 0

	// 最初の行は目標値
	if _, err := sc.Scan(); err != nil {
		return
	}
	target := sc.Text().Trim().ParseInt(&numbers[0], 64)
	if err != nil {
		return
	}

	// 以下は整数の1行1値
	for {
		line := sc.Scan()
		if line == "" {
			continue
		}
		// 1つ1つ、64bit 整数に制限
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		// 2つ以上が存在しない場合は終了
		if len(numbers) < 2 {
			break
		}
		// 2つ以上が存在しなければ終了
		if len(numbers) < 2 {
			break
		}
		// 値が目標値になる2つを見つける
		for i := 0; i < len(numbers); i++ {
			for j := i + 1; j < len(numbers); j++ {
				if numbers[i]+numbers[j] == target {
					pairs++
					break
				}
			}
		}
		if pairs == 0 {
			break
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
