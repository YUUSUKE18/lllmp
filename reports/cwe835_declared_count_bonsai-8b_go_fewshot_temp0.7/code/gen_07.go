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
	sc.Scan()
	count := 0
	sum := 0
	for {
		n, err := sc.ReadRune()
		if err != nil {
			if n == '\n' {
				break
			}
			continue
		}
		if n == '\n' {
			break
		}
		var num string
		for n >= 0 && (n == '\n' || n == '\r' || n == '\t') {
			num += string(rune(n))
			n--
		}
		if len(num) == 0 {
			continue
		}
		if _, err := strconv.Atoi(num); err == nil {
			num, _ = strings.TrimSpace(num)
			if num != "" {
				count++
				sum += num
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
