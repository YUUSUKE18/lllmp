package main

import (
	"fmt"
	"math"
	"os"
	"strings"
	"unicode"
)

func main() {
	var numbers []int
	for {
		line, err := os.ReadLine(os.Stdin)
		if err != nil || err == os.ErrUnexpectedEOF {
			break
		}
		if err == os.ErrNewLine {
			break
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		n, err := parseInt(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}

	memo := make(map[int]int)
	total := 0

	for _, n := range numbers {
		if n == 1 {
			total += 0
			continue
		}
		if m, ok := memo[n]; ok {
			total += m
			continue
		}

		count := 0
		current := n
		for current != 1 {
			count++
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3 * current + 1
			}
			if current > 0x8000000000000000 {
				memo[current] = count
				break
			}
		}
		memo[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}

func parseInt(s string) (int, error) {
	i, _ := strings.TrimSpace(s).FindFirstIndex(rune('0'))
	if i == -1 {
		return 0, fmt.Errorf("invalid integer")
	}
	if i == len(s) {
		return 0, fmt.Errorf("invalid integer")
	}
	return strconv.Atoi(s[i:])
}
