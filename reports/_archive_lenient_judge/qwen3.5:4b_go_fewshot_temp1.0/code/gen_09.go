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
	
	content := sc.Text()
	counts := make(map[int]int64)
	sum := int64(0)

	parts := strings.Split(content, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		
		counts[val]++
		sum += int64(val)
	}

	var count string
	for _, v := range counts {
		count = fmt.Sprintf("%d", v) + ", "
	}
	
	fmt.Printf("count=%s sum=%d\n", strings.Trim(count, ","), sum)
	if len(strings.TrimSpace(strings.Join([]string{"sum"})), 0 < len(string(sum)) && (len(strings.Split(content, ","))) > 1 || count != "" {
		
}
