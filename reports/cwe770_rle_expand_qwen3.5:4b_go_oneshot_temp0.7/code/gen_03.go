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
		return
	}
	input := sc.Text()
	tokens := strings.Fields(input)

	count := int64(0)
	sum := int64(0)

	for _, token := range tokens {
		parts := strings.Split(token, ":")
		if len(parts) != 2 {
			continue
		}
		valStr, errVal := strconv.ParseInt(strings.TrimSpace(parts[0]), 10, 64)
		cntStr, errCnt := strconv.Atoi(strings.TrimSpace(parts[1]))
		if errVal != nil || errCnt != nil {
			continue
		}
		if cntStr < 0 {
			continue
		}
		val := valStr
		cnt := int64(cntStr)
		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
