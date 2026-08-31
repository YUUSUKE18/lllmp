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
	sc.Scan()
	input := strings.TrimSpace(sc.Text())
	if input == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	counts := make(map[int]int)
	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		fields := strings.Fields(part)
		if len(fields) != 2 {
			continue
		}
		valStr, err1 := strconv.Atoi(strings.TrimSpace(fields[0]))
		countStr, err2 := strconv.Atoi(strings.TrimSpace(fields[1]))
		if err1 != nil || err2 != nil {
			continue
		}
		counts[valStr] += countStr
	}

	var total int64 = 0
	for _, c := range counts {
		total += int64(c)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), total)
}
