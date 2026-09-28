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
	line, _ := sc.Text()
	count, err := strconv.Atoi(line)
	if err != nil {
		return
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
