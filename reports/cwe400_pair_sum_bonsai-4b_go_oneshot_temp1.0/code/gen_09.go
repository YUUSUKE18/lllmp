package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	目标 := 0
	for _, line := range sc.lines() {
		line = line.strip()
		if line == "" {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if val > 0 {
			numbers = append(numbers, val)
		}
	}
	if len(numbers) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}
	targetPairs := 0
	for i < len(numbers) {
		for j > i {
			if numbers[i]+numbers[j] == target {
				targetPairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", targetPairs)
}
