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
	
	var counts map[int]int
	var totalSum int64
	
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		
		counts[n]++
		totalSum += int64(n)
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}
