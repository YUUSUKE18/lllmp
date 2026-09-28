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
	
	// 空要素・前後の空白を無視し、カンマ区切りで分割
	parts := strings.Split(input, ",")
	
	seen := make(map[int]bool)
	sum := int64(0)
	
	for _, part := range parts {
		w := strings.TrimSpace(part)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		
		if !seen[n] {
			seen[n] = true
			sum += int64(n)
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", len(seen), sum)
}
