package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))
	
	var input string
	fmt.Fprintln(reader, "Enter integer list separated by commas:")
	if _, err := reader.ReadString('\n'); err != nil {
		return
	}
	input = strings.TrimSpace(reader.String())

	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(input, ",")
	numbers := make(map[int]int)
	sumBig := big.NewInt(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		numbers[val]++
		sumBig.Add(sumBig, big.NewInt(int64(val)))
	}

	count := len(numbers)
	sum := sumBig.Int64()

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
