package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	var count, sum int
	// Read the count line
	countLine := os.Getenv("count")
	if countLine == "" {
		fmt.Println("0")
		return
	}
	// Parse the count line
	if err := strconv.Atoi(countLine); err != nil {
		fmt.Println("0")
		return
	}
	count = count

	// Read the sum line
	sumLine := os.Getenv("sum")
	if sumLine == "" {
		fmt.Println("0")
		return
	}
	// Parse the sum line
	if err := strconv.Atoi(sumLine); err != nil {
		fmt.Println("0")
		return
	}
	sum = sumLine

	// Read the rest lines
	var numbers []int
	for line := range os.Getenv("numbers") {
		if line == "" {
			continue
		}
		if err := strconv.Atoi(line); err != nil {
			continue
		}
		numbers = append(numbers, num)
	}

	// Actual count is the number of valid integers read
	actualCount := len(numbers)
	// Actual sum is the sum of those integers
	actualSum := 0
	for _, num := range numbers {
		actualSum += num
	}

	// Output the result
	fmt.Printf("count=%d sum=%d\n", actualCount, actualSum)
}
