package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	countStr := strings.TrimSpace(os.Args[0])
	sumStr := "0"

	if len(countStr) == 0 {
		fmt.Println("0 0")
		return
	}

	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("0 0")
		return
	}

	var sum int
	for i := 1; i < len(os.Args); i++ {
		line := strings.TrimSpace(os.Args[i])
		if line == "" {
			continue
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
