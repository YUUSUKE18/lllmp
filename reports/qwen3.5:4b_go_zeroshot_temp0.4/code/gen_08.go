package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil)
	var input string
	fmt.Fprintln(reader)
	input = reader.ReadString('\n')
	
	if input == "" {
		return
	}

	var numbers []int64
	for _, s := range input {
		if s >= '0' && s <= '9' {
			numbers = append(numbers, int64(s - '0'))
		}
	}

	if len(numbers) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	var seen map[int64]bool
	for _, n := range numbers {
		if !seen[n] {
			seen[n] = true
		}
	}

	count := len(seen)
	sum := int64(0)
	for n := range seen {
		sum += n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
