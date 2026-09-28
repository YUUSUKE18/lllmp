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
	count, sum := 0, 0
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		if strings.TrimSpace(string(n)) != "" {
			var x int64
			if err := strconv.ParseInt(string(n), 10, 64); err == nil {
				count++
				sum += x
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
