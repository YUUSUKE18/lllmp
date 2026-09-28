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
	input := strings.TrimSpace(sc.Text())

	count := int64(0)
	sum := int64(0)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		f := strings.Fields(part)
		if len(f) != 2 {
			continue
		}

		n, err1 := strconv.ParseInt(f[0], 10, 64)
		if err1 != nil {
			continue
		}

		m, err2 := strconv.Atoi(f[1])
		if err2 != nil || m < 0 {
			continue
		}

		count += int64(m)
		sum += n * int64(m)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
