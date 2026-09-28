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
	var count, sum int
	for {
		n, err := sc.Read([]byte(64 * 1024))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		if len(strings.TrimSpace(string(n))) > 0 {
			var x int
			if err := strconv.Atoi(string(n)); err == nil {
				count++
				sum += x
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
