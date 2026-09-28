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
	count, sum := 0, 0
	for _, s := range strings.Fields(sc.Text()) {
		if strings.TrimSpace(s) != "" {
			parts := strings.SplitN(s, ":", 2)
			if len(parts) == 2 {
				value, num := parts[0], parts[1]
				n, err := strconv.Atoi(num)
				if err != nil {
					continue
				}
				if n < 0 {
					continue
				}
				count++
				sum += n
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
