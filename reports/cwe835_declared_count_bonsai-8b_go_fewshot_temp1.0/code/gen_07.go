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
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		if strings.TrimSpace(string(n)) == "" {
			continue
		}
		var num int64
		if err := strconv.Atoi(string(n)); err == nil {
			num = num64(n)
			if num > sum {
				sum = num
			}
			count++
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func num64(s string) int64 {
	n, _ := strconv.ParseInt(s, 64, 64)
	return n
}
