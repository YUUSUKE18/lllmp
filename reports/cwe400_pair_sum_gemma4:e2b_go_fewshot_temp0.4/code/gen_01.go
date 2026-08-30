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
	if !sc.Scan() {
		return
	}
	targetStr := sc.Text()

	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗した場合は終了
		return
	}

	numbers := []int64{}
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	count := 0
	n := len(numbers)

	// 2個の組 (i, j) で numbers[i] + numbers[j] == target となるものを探す (i != j)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
