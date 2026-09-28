package main

import (
	"bufio"
	"fmt"
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
		if !first {
			numbers = append(numbers, n)
		}
		first = false
	}

	if len(numbers) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}

	target := numbers[0]
	count := 0
	for _, n := range numbers[1:] {
		if n == target {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
