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
	
	count := int64(0)
	sum := int64(0)
	
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
		
		valStr, err1 := strconv.Atoi(fields[0])
		countStr, err2 := strconv.Atoi(fields[1])
		
		if err1 != nil || err2 != nil {
			continue
		}
		
		val := int64(valStr)
		cnt := int64(countStr)
		
		count += cnt
		sum += val * cnt
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
