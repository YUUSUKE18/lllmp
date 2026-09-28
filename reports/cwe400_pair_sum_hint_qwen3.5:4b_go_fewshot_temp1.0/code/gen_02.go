package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var target string
	targetErr := scanner.Scan()
	if targetErr != nil {
		return
	}
	if !scanner.Scan() {
		return
	}

	lineNum := 1
	count, _ := strconv.Atoi(scanner.Text())
	lines := []int{}
	for scanner.Scan() && lineNum < 500000 {
		s := scanner.Text()
		// 空行や空白だけの行をスキップ
		if len(s) == 0 {
			continue
		}
		for _, v := range s {
			if v == ' ' || v == '\t' || v == '\r' || v == '\n' || v == '\f' {
				continue
			}
			break
		}
		if len(s) == 0 {
			continue
		}

		val, err := strconv.Atoi(s)
		if err != nil {
			continue
		}

		if val > target || (target < 0 && val <= target) {
			continue
		}

		for i := range lines {
			j := i + 1
			if j >= len(lines) {
				break
			}
			sum := lines[i] + lines[j]
			if sum == target {
				count++
				break
			}
		}

		lines = append(lines, val)
		lineNum++
		if lineNum > 200000 {
			break
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
