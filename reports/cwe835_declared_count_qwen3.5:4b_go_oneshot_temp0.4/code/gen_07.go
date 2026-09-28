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
		line, _ := strconv.Atoi(sc.Text())
		count = line
	}

	for i := 0; i < count; i++ {
		if !sc.Scan() {
			break
		}
		valStr := sc.Text()
		if valStr == "" {
			continue
		}
		n, err := strconv.ParseInt(valStr, 10, 64)
		if err != nil {
			continue
		}
		sum += n
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
