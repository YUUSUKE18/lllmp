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
	input := sc.Text()
	
	split := strings.Split(input, ",")
	counts := make(map[int]int64)
	totalSum := int64(0)
	
	for _, s := range split {
		t := strings.TrimSpace(s)
		if t == "" {
			continue
		}
		n, err := strconv.Atoi(t)
		if err != nil {
			continue
		}
		counts[n]++
		totalSum += int64(n)
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}
