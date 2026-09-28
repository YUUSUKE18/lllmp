package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var count string
	count, _ = os.ReadStringln(os.Stdin)
	count = strconv.Atoi(count)

	var numbers []int
	for {
		line, _ := os.Readln(os.Stdin)
		if line == "" {
			break
		}
		num, _ := strconv.Atoi(line)
		numbers = append(numbers, num)
	}

	total := 0
	for _, num := range numbers {
		total += num
	}

	fmt.Printf("count=%d sum=%d\n", count, total)
}
