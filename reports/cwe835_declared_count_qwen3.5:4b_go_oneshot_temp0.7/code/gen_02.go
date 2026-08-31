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

	if sc.Scan() {
		line, _ := sc.Text()
		n, err := strconv.Atoi(line)
		if err != nil {
			count = 0
			fmt.Printf("count=0 sum=0\n")
			return
		}
		count = n
	}

	for i := 1; ; i++ {
		if !sc.Scan() {
			break
		}
		line, _ := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
