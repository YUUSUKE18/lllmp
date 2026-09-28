package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64
	linesRead := 0
	for sc.Scan() {
		linesRead++
		line := sc.Text()
		if linesRead == 1 {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n <= 0 {
			continue
		}
		count++
		for i := 0; i < int(n); i++ {
			valStr := fmt.Sprintf("%d", i)
			v, err := strconv.ParseInt(valStr, 10, 64)
			if err != nil {
				continue
			}
			sum += v
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
