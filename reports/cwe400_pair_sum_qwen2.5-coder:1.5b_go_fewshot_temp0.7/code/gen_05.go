package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	var target int64
	fmt.Scan(&target)
	count := 0
	var numbers []int64
	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		numbers = append(numbers, line)
	}
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
