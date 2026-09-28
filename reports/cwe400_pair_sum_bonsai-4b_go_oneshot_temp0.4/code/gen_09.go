package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	first := true

	for {
		line := sc.Scan()
		if line == "" {
			break
		}
		if _, err := strconv.Atoi(line); err == nil {
			if first {
				first = false
			}
			numbers = append(numbers, strconv.Atoi(line))
		}
	}

	if len(numbers) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}

	target := 0
	for _, n := range numbers {
		if n > target {
			target = n
		}
	}

	// 2 位の組を検索
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
