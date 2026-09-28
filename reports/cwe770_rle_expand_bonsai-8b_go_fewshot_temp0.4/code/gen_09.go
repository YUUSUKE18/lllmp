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
				val, _ := strconv.Atoi(parts[0])
				_, err := strconv.Atoi(parts[1])
				if err != nil {
					continue
				}
				if val >= 0 {
					count++
					sum += val
				}
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
