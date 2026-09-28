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
	pairs := strings.Split(input, ",")
	count := 0
	sum := int64(0)
	for _, pair := range pairs {
		parts := strings.Fields(pair)
		if len(parts) != 2 {
			continue
		}
		valStr, errVal := strconv.Atoi(parts[0])
		if errVal != nil {
			continue
		}
		countStr, errCount := strconv.Atoi(parts[1])
		if errCount != nil {
			continue
		}
		val := int64(valStr)
		cnt := int64(countStr)
		count += cnt
		sum += val * cnt
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
