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
	max := 0
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
		if strings.TrimSpace(string(n)) == "" {
			continue
		}
		if max == 0 {
			max = n
		} else if n > max {
			max = n
		}
		count++
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
