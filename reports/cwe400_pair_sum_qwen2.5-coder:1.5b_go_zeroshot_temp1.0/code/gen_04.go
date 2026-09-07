package main

import (
	"fmt"
)

func main() {
	target := int64(readInt())
	numbers := make([]int64, 0)

	for {
		line := readLine()
		if len(line) == 0 {
			break
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		numbers = append(numbers, num)
	}

	pairsCount := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairsCount++
			}
		}
	}

	fmt.Println("pairs=", pairsCount)
}

func readInt() int64 {
	var n int
	fmt.Scan(&n)
	return int64(n)
}

func readLine() string {
	var line string
	fmt.Scanln(&line)
	return line
}
