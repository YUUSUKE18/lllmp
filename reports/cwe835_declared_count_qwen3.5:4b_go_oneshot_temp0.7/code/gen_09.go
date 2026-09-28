package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var n int
	if sc.Scan() {
		s, _ := strconv.Atoi(sc.Text())
		n = s
	} else {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	count := 0
	sum := int64(0)

	for i := 1; i <= n; i++ {
		if !sc.Scan() {
			break
		}
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		sum += int64(val)
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
