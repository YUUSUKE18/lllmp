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
	
	var count, sum uint64
	hasValue := false
	
	for _, pairStr := range strings.Split(sc.Text(), ",") {
		pairStr = strings.TrimSpace(pairStr)
		if pairStr == "" {
			continue
		}
		
		parts := strings.Split(pairStr, ":")
		if len(parts) != 2 {
			continue
		}
		
		valStr, errVal := strconv.ParseInt(strings.TrimSpace(parts[0]), 10, 64)
		cntStr, errCnt := strconv.Atoi(strings.TrimSpace(parts[1]))
		
		if errVal != nil || errCnt != nil {
			continue
		}
		
		val := uint64(valStr)
		cnt := uint64(cntStr)
		
		if val > 0 && cnt >= 0 {
			hasValue = true
			count += cnt
			sum += val * uint64(cnt)
		}
	}
	
	if !hasValue {
		count = 0
		sum = 0
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
