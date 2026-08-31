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
	text := sc.Text()
	pairs := strings.Split(text, ",")
	count := int64(0)
	sum := int64(0)
	for _, pair := range pairs {
		fields := strings.Fields(pair)
		if len(fields) != 2 {
			continue
		}
		valStr, countStr := fields[0], fields[1]
		v, errVal := strconv.ParseInt(valStr, 10, 64)
		c, errCount := strconv.ParseInt(countStr, 10, 64)
		if errVal != nil || errCount != nil {
			continue
		}
		count += c
		sum += v * c
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
