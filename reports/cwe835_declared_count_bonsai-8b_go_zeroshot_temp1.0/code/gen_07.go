package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	countStr := os.Args[0]
	sumStr := "0"

	count := 0
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if val, err := strconv.Atoi(line); err == nil {
			count++
			sumStr = strconv.FormatInt(int64(sumStr)+val, 10)
		}
	}

	if count == 0 {
		fmt.Println("count=0 sum=0")
	} else {
		fmt.Printf("count=%d sum=%d\n", count, sumStr)
	}
}
