package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var input strings.NewReader(os.Stdin)
	var elements []string

	for {
		input, _ = input.ReadString('\n')
		if input == "" {
			break
		}
		for _, s := range strings.Fields(input) {
			if unicode.IsLetter(s) {
				continue
			}
			if val, err := strconv.Atoi(s); err == nil {
				if val > 0x7FFFFFFFFFFFFFFF {
					continue
				}
				if val < -0x8000000000 {
					continue
				}
				elements = append(elements, s)
			}
		}
	}

	count := 0
	max := -1

	for _, s := range elements {
		val, err := strconv.Atoi(s)
		if err == nil {
			count++
			if val > max {
				max = val
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
