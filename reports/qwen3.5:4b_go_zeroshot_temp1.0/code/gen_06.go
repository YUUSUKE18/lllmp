package main

import (
	"bufio"
	"fmt"
	"math"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil)

	var uniqueInts []int64
	var totalSum int64 = 0
	count := map[int64]int{}

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		reader.Reset()
		scanner := bufio.NewScanner(reader)
		err = scanner.Scan()
		if err != nil || !scanner.Text().Contains(',') {
			continue
		}
		parts := scanner.Split(',')
		for _, part := range parts {
			val, err := strconv.Atoi(part)
			if err == nil {
				count[val]++
				totalSum += int64(val)
				uniqueInts = append(uniqueInts, val)
			}
		}
		break
	}

	fmt.Printf("count=%d sum=%d\n", count.Len(), totalSum)
}
