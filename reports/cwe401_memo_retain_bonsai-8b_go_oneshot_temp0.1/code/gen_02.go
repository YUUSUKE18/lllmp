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
		sc.Scan()
		if !sc.Err() {
			if unicode.IsDigit(sc.Text()) {
				n, err := strconv.Atoi(sc.Text())
				if err != nil {
					continue
				}
				if n == 1 {
					fmt.Println("total=0\n")
					return
				}
				if seen[n] != 0 {
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
					if seen[current] != 0 {
						break
					}
					seen[current] = count
				}
				total += seen[n]
			}
		}
	}
}
