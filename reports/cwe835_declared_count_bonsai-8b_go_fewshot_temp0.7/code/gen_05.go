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
		n, err := sc.ReadRune(buf)
		if err != nil {
			if n == 0 {
				break
			}
			break
		}
		if n == 0 {
			break
		}
		if err != nil {
			break
		}
		if strings.TrimSpace(buf[:n]) != "" {
			var x int64
			if err := strconv.ParseInt(buf[:n], 10, 64); err == nil {
				sum += x
				count++
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
