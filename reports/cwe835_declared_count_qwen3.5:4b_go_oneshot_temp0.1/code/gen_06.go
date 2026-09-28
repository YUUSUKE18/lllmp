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
	var sum int64

	if !sc.Scan() {
		return
	}
	line1, _ := sc.Text()
	n, err := strconv.Atoi(line1)
	if err != nil {
		count = 0
		sum = 0
	} else {
		count = n
	}

	for i := 0; i < count; i++ {
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
