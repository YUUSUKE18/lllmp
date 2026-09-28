package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}
	targetStr := sc.Text()
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	var numbers []int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	n := len(numbers)
	if n < 2 {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
