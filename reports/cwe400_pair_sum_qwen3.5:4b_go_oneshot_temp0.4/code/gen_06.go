package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.ParseInt(sc.Scan(), 10, 64)
	if err != nil || !sc.Scan() {
		fmt.Printf("pairs=0\n")
		return
	}

	var count int64
	sum := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		diff := target - val
		if diff > sum {
			count++
			sum = diff + val
		} else if diff == sum {
			count += 2
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
