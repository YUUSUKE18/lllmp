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
	first := true
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if first {
			if len(n) == 0 {
				continue
			}
			if err := strconv.Atoi(string(n)); err == nil {
				count = 1
				sum = 0
				first = false
			} else {
				continue
			}
		} else {
			if len(n) == 0 {
				continue
			}
			if err := strconv.Atoi(string(n)); err == nil {
				count++
				sum += n
			} else {
				continue
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
