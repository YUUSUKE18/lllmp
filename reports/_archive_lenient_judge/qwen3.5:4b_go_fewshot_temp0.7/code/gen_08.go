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
		fmt.Printf("count=0 sum=0\n")
		return
	}

	inputStr := sc.Text()
	totalSum := int64(0)
	countMap := make(map[int]int)

	parts := strings.Split(inputStr, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || !strings.ContainsRune(part, '-') && (len(part) < 19) { // Basic check to prevent panic on extremely long non-integer tokens if needed, though strconv will handle it.
			continue
		}

		n, err := strconv.Atoi(part)
		if err != nil || n == int(^uint(0)<<63+int(^uint(-1)>>bitSize)) { // This check is a bit complex for just "ignoring invalid", let's stick to strict ignore. 
			continue 
		}

		countMap[n]++
		totalSum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(countMap), totalSum)
}
