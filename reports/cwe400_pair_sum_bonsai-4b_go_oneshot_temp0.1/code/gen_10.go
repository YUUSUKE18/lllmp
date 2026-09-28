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
	var target int

	// 最初の行は目標値
	line, err := sc.Scan()
	if err != nil {
		return
	}
	if line == "" {
		return
	}
	target, err := strconv.Atoi(line)
	if err != nil {
		return
	}

	// 2 行目以降は整数
	for {
		line, err := sc.Scan()
		if err != nil {
			return
		}
		if line == "" {
			return
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			return
		}
		numbers = append(numbers, n)
		if len(numbers) >= 2 {
			// 2 個の組が目標値を達成する場合
			for i := 0; i < len(numbers); i++ {
				for j := i + 1; j < len(numbers); j++ {
					if numbers[i]+numbers[j] == target {
						// 2 個の組を増加
						pairs := 0
						for k := 0; k < len(numbers); k++ {
							for l := k + 1; l < len(numbers); l++ {
								if numbers[k]+numbers[l] == target {
									pairs++
								}
							// 2 個の組は2回だけ記録
						}
						// 2 個の組の個数は1回に1回
						// 2 個の組が存在する場合のみ
						if pairs > 0 {
							fmt.Printf("pairs=%d\n", pairs)
							return
						}
					}
				}
			}
		}
	}
}
