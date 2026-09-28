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
		n, err := sc.ReadLine()
		if err != nil {
			break
		}
		if strings.TrimSpace(n) == "" {
			continue
		}
		if val, err := strconv.Atoi(n); err != nil {
			continue
		}
		sum += val
		count++
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
