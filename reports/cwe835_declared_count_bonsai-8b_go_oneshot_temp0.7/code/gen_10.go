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
	countStr := strings.Fields(sc.Text())[0]
	var count int
	if err := strconv.Atoi(countStr); err == nil {
		count = countStr
	}
	sum := 0
	first := true
	for _, line := range sc.Text() {
		if strings.TrimSpace(line) {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			if first || n > sum {
				sum = n
				first = false
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
