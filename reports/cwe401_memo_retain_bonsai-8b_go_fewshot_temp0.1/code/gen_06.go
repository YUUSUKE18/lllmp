package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	seen := make(map[int]int)

	for {
		n, err := sc.ReadInt()
		if err != nil {
			if err == unicode.ErrUnexpectedEOF {
				break
			}
			continue
		}

		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}

		if seen[n] != 0 {
			fmt.Printf("total=%d\n", total)
			continue
		}

		seen[n] = 1
		count := 0
		current := n

		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}

		total += count
	}

	fmt.Printf("total=%d\n", total)
}
