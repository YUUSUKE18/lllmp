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
	first = true

	for {
		line := sc.Scan()
		if line == "" {
			break
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first {
			first = false
			continue
		}
		numbers = append(numbers, n)
	}

	if len(numbers) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}

	target := 0
	for _, n := range numbers {
		if n == target {
			target += 1
		}
	}

	// 2 位の組を足してtargetになる
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
