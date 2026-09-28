package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	scanner := bufio.NewScanner(reader)

	target, err := scanner.ScanInt()
	if err != nil {
		fmt.Println("Input error:", err)
		return
	}

	numbers := make([]int, target)
	for i := range numbers {
		if !scanner.ScanInt(&numbers[i]) {
			fmt.Println("Input error:", err)
			return
		}
	}

	// Sort the numbers
	sort.Ints(numbers)

	pairs := 0
	for i := 0; i < len(numbers)-1; i++ {
		if numbers[i] < numbers[i+1] {
			continue
		}
		for j := i + 1; j < len(numbers); j++ {
			if numbers[j] < numbers[i] + numbers[j+1] {
				continue
			}
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
