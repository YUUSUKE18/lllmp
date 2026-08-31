package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int64
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		fields := []string{}
		for _, f := range fields(line) {
			n, err := strconv.ParseInt(f, 10, 64)
			if err != nil {
				continue
			}
			count++
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
