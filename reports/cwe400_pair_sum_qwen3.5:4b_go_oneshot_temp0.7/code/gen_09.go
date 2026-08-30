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
		fmt.Println("pairs=0")
		return
	}

	count := 0
	sumMap := make(map[int64]int)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		diff := target - n

		if c, ok := sumMap[diff]; ok {
			count += c
		}
		sumMap[n] = sumMap[n] + 1
	}

	fmt.Printf("pairs=%d\n", count)
}
