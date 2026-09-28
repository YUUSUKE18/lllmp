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
	var count, sum int
	elements := strings.Fields(sc.Text())
	for _, e := range elements {
		if strings.TrimSpace(e) != "" {
			parts := strings.Split(e, ":")
			if len(parts) == 2 {
				val, _ := strconv.Atoi(parts[0])
				num, _ := strconv.Atoi(parts[1])
				if num >= 0 {
					count += num
					sum += val * num
				}
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
