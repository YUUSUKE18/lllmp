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
	count := int64(0)
	sum := int64(0)
	for _, p := range pairs {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		fields := strings.Split(p, ":")
		if len(fields) != 2 {
			continue
		}
		valStr, err1 := strconv.Atoi(strings.TrimSpace(fields[0]))
		countStr, err2 := strconv.Atoi(strings.TrimSpace(fields[1]))
		if err1 != nil || err2 != nil {
			continue
		}
		val := int64(valStr)
		c := int64(countStr)
		if c < 0 {
			continue
		}
		count += c
		sum += val * c
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
