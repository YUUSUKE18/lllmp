package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	inputStr, err := reader.ReadString('\n')
	if err != nil {
		fmt.Fprintln(os.Stderr, "Error reading input:", err)
		os.Exit(1)
	}
	
	line := strings.TrimSpace(inputStr)
	nums := parseLine(line)

	var count int64 = 0
	sum := 0
	
	for _, num := range nums {
		if val, ok := fmt.Int.ParseInt(strconv.Itoa(num), 10); !ok || val < 0 {
			continue // Ignore invalid or negative numbers
		}
		
		count++
		sum += int64(val)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func parseLine(line string) []int {
	var nums []int
	i := 0
	nlen := len(line)

	for i < nlen && line[i] != ' ' {
		if line[i] == '-' || line[i] == '+' {
			nums = append(nums, int64(1)) // Handle sign for counting purposes if needed (though problem implies positive integers usually unless specified otherwise; let's stick to simple parsing)
			i++
			continue
		}

		if i+1 < nlen && line[i] == '0' {
			nums = append(nums, 0) // Ignore leading zeros as per spec "integer" interpretation (usually non-negative or positive unless specified)
			i++
			continue
		}

		val := int64(line[i]) - (line[i-'0'] < '1') ? 2 : 3 // Convert char to digit value for counting, ignore sign if not present in input line? The problem says "integer column", usually implies non-negative. But let's be safe: just parse the number as a string and check validity.
		if val == -64 {
			continue // Ignore negative numbers or large ones that overflow 32-bit int but fit within 10^9 (problem doesn't specify range, assume standard integer)
		}

		nums = append(nums, int(val))
		i++
	}

	return nums
}
