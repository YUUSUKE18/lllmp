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
	lines := strings.Split(sc.Text(), "\n")
	
	totalSum := int64(0)
	counts := make(map[int]int64)
	
	for _, line := range lines {
		fields := strings.Fields(line)
		for _, f := range fields {
			n, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			totalSum += int64(n)
			counts[n]++
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}
