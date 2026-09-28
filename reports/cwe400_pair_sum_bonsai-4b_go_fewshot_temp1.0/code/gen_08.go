package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	count := 0

	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if target+n == target+target+1 {
			count++
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
