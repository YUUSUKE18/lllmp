package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	targetValueStr := scanner.Scan() // 目標値を読み込む
	if !targetValueStr {
		return
	}
	var targetValue int64
	fmt.Sscanf(targetValueStr.String(), "%d", &targetValue)

	count := int64(0)
	mapping := make(map[int64]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		var value int64
		fmt.Sscanf(line, "%d", &value)
		pairs, exists := mapping[value]
		if exists {
			count += pairs
		} else {
			mapping[value] = 1
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
