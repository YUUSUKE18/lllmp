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
		n, err := sc.Read([]byte(64*1024))
		if err != nil {
			break
		}
		if strings.TrimSpace(string(n)) != "" {
			count++
			var num int64
			if err := strconv.ParseInt(string(n), 10, 64); err == nil {
				sum += num
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
