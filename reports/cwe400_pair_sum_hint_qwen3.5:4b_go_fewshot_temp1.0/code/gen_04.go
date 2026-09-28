package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan(2) {
		fmt.Printf("pairs=0\n")
		return
	}

	targetStr := sc.Text()
	var err error
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	sums := make(map[int]int64) // 値 -> 出現回数（累積和）
	countPairs := int64(0)
	currentSum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sums[currentSum] += n
		currentSum += n

		// 現在の値 - target が map に存在するか確認
		diff := currentSum - target
		if prevCount, ok := sums[diff]; ok && prevCount > 0 {
			countPairs += prevCount * n
		}
	}

	fmt.Printf("pairs=%d\n", countPairs)
}
