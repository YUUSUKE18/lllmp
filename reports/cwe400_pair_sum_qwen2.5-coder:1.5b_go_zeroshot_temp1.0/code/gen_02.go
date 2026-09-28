package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	target, _ := strconv.Atoi(scanner.Text())

	var count int
	for i := 0; i < target; i++ {
		if scanner.Scan() {
			num, err := strconv.Atoi(scanner.Text())
			if err == nil {
				count += findPairs(target, i, num)
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

func findPairs(target, start, num int) int {
	count := 0
	for i := start + 1; i < target; i++ {
		if i != start && num+i == target {
			count++
		}
	}
	return count
}
