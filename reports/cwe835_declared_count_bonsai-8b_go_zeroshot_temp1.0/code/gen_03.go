package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	count := 0
	sum := 0
	var numbers []int

	for {
		line, _ := os.ReadLine(os.Stdin)
		if !line {
			break
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, num)
		count++
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
