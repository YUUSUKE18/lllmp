package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		for _, p := range parts {
			n, err := strconv.ParseInt(p, 10, 64)
			if err != nil {
				continue
			}
			count++
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
