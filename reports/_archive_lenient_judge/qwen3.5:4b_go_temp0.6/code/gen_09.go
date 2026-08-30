package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(stdin)
	var input string
	if _, err := reader.ReadBytes('\n'); err != nil && len(input) == 0 {
		return
	}
	input = " " + input // Leading space to handle empty lines gracefully

	for i, c := range input {
		if (i > 0 || (input[i-1] >= '0' && input[i-1] <= '9')) && c == ',' {
			continue
		} else if c != '-' && (c < '0' || c > '9') {
			input = fmt.Sprintf("%s%s", input[:i], input[i:]) // Remove non-digit characters except minus sign at start of number
		}
		if i == len(input)-1 && input[len(input)-2] >= '0' && input[len(input)-2] <= '9' {
			input = fmt.Sprintf("%s%s", input[:len(input)], input[i:]) // Ensure last digit is included if it was removed by the previous condition
		} else if i == len(input) - 1 {
			continue
		}
	}

	var seen *big.IntSet
	sum := new(big.Int).SetInt64(0)

	for _, numStr := range input[len(" "):] // Skip leading space added earlier
	num, ok := strconv.ParseInt(numStr[1:], 10, 64) // Remove the first character if it's a minus sign (already handled by ParseInt but we need to handle negative numbers correctly)
	if !ok {
		continue
	}

	var count int = 0
	for _, n := range nums {
		nBig := big.Int{}
		fmt.Scan(&nBig, &count) // Use the correct method for reading from input
		sum.Add(sum, num)
		count++
		if !seen.Contains(nBig) {
			seen.Insert(nBig)
		} else if seen.Contains(numStr[n]) {
			continue
		}

	fmt.Printf("count=%d sum=%s\n", count, sum.String()) // Output the result in the specified format
