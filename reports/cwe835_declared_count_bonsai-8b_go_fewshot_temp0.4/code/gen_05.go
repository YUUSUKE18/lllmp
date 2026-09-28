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
	first := true
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if first {
			if _, err := strconv.Atoi(buf[:n]); err == nil {
				count = 1
				sum = buf[:n]
			}
			continue
		}
		if n == 0 {
			continue
		}
		if _, err := strconv.Atoi(buf[:n]); err == nil {
			count++
			sum = sum + buf[:n]
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
