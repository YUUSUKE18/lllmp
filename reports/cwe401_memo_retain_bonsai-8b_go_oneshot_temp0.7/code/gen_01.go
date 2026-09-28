package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		if !sc.Scan() {
			break
		}
		s := strings.TrimSpace(sc.Text())
		if unicode.IsDigit(s) {
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n == 1 {
				fmt.Println("total=0\n")
				return
			}
			if _, exists := memo[n]; exists {
				fmt.Println("total=" + fmt.Sprintf("%d\n", memo[n]))
				continue
			}
			memo[n] = 0
			current := n
			count := 0
			do {
				current = current / 2
				count++
				if current == 1 {
					memo[current] = count
					break
				}
			} while current != 1
			// current is not 1, so we need to apply 3n+1
			current = 3 * current + 1
			count = memo[current] + 1
			memo[current] = count
			total += count
		}
	}
	fmt.Println("total=" + fmt.Sprintf("%d\n", total))
}
