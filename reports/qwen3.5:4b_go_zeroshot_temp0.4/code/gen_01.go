package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	lines := strings.Split(input, "\n")
	var numbers []int64

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				continue
			}

			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			numbers = append(numbers, val)
		}
	}

	if len(numbers) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	set := make(map[int64]bool)
	for _, num := range numbers {
		set[num] = true
	}

	var count int64
	var sum big.Int
	sum.SetInt64(0)

	for num := range set {
		count++
		sum.Add(&sum, big.NewInt(num))
	}

	fmt.Printf("count=%d sum=%s\n", count, sum.String())
}
