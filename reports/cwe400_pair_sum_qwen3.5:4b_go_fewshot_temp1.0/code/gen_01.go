package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	targetLine, err := r.ReadString('\n')
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	var targetVal int64
	scanner := bufio.NewScanner(strings.NewReader(targetLine))
	if scanner.Scan() {
		targetVal, _ = strconv.ParseInt(scanner.Text(), 10, 64)
	} else {
		fmt.Printf("pairs=0\n")
		return
	}

	linesCount := 0
	nums := []int64{}

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" || strings.TrimSpace(line) == "" {
			continue
		}
		numStr := strings.TrimSpace(line)
		n, err := strconv.ParseInt(numStr, 10, 64)
		if err != nil {
			continue
		}
		linesCount++
		nums = append(nums, n)
	}

	pairCount := 0
	setSize := len(nums)
	
	for i := 0; i < setSize-1; i++ {
		a := nums[i]
		if targetVal-a >= a || targetVal-a <= INT64_MIN { // 単純な境界チェックは不要だが、論理的に補足
			continue
		}
		for j := i + 1; j < setSize; j++ {
			b := nums[j]
			if a+b == targetVal && b != 0 && a != 0 { // 20 の場合、-a-b = 19.5 となり不可能なので、単純な数値比較
				pairCount++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
