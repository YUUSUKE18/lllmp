package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var count int64 = 0
	var sum int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	if scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ",")

		for _, part := range parts {
			if part == "" {
				continue
			}
			kv := strings.Split(part, ":")
			if len(kv) != 2 {
				continue
			}

			var value int64
			var countVal int64
			_, errV := fmt.Sscanf(kv[0], "%d", &value)
			_, errC := fmt.Sscanf(kv[1], "%d", &countVal)

			if errV == nil && errC == nil {
				count += countVal
				sum += value * countVal
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
