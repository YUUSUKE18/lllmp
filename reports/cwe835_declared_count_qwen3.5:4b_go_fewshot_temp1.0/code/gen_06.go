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
	lines, chars := 0, 0
	count, sum := 0, int64(0)
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		fields := strings.Fields(line)
		if len(fields) == 1 {
			n, err := strconv.ParseInt(fields[0], 10, 64)
			if err != nil {
				continue
			}
			lines++
			count = int(n)
		} else if len(fields) > 1 {
			for _, f := range fields[1:] {
				n, err := strconv.ParseInt(f, 10, 64)
				if err != nil {
					continue
				}
				sum += n
				lines++
				count++
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
