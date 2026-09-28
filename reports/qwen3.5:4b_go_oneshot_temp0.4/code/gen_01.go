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
	
	// 空白とカンマで分割し、整数を解析
	var counts map[int]int
	for _, token := range strings.Split(input, ",") {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}
		
		n, err := strconv.Atoi(token)
		if err != nil {
			continue
		}
		
		counts[n]++
	}
	
	var totalSum int64 = 0
	for n := range counts {
		totalSum += int64(n * counts[n])
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}
