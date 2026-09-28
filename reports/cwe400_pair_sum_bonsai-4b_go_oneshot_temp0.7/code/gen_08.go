package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var pairs []int
	// 1. 最初の行は目標値
	var firstLine int
	for _, line := range sc.Lines() {
		if len(line.trim()) == 0 {
			continue
		}
		// 1番目は目標値
		if len(line.trim()) == 1 {
			firstLine = line.trim()
			break
		}
		// 2级以上は整数
		if line.trim() != "" {
			// 1番の目標値はこの行を読み取る
			val, err := strconv.Atoi(firstLine)
			if err != nil {
				continue
			}
			// 2级以上は整数
			if len(line.trim()) == 1 {
				n, err := strconv.Atoi(line.trim())
				if err != nil {
					continue
				}
				if n == val {
					pairs = append(pairs, 1)
				} else {
					pairs = append(pairs, 2)
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", len(pairs))
}
