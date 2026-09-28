package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var numbers []string
	for {
		n, err := sc.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			break
		}
		if strings.TrimSpace(n) != "" {
			numbers = append(numbers, n)
		}
	}

	total := 0
	for _, numStr := range numbers {
		num, err := strconv.Atoi(numStr)
		if err != nil {
			continue
		}
		if num == 1 {
			total += 0
			continue
		}
		if memo[num] != 0 {
			total += memo[num]
			continue
		}
		count := 0
		current := num
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		memo[num] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
