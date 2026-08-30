package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil)
	var target int64
	if _, err := fmt.Fscanf(reader, "%d", &target); err != nil {
		return
	}

	count := 0
	numbers := []int64{}

	for {
		line, _ := reader.ReadString('\n')
		if line == "" {
			break
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if val >= target {
			continue
		}
		numbers = append(numbers, val)
	}

	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i] + numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
