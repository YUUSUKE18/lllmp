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
	count := 0
	sum := 0
	for _, s := range strings.Fields(sc.Text()) {
		if strings.TrimSpace(s) == "" {
			continue
		}
		parts := strings.SplitN(s, ":", 2)
		if len(parts) != 2 {
			continue
		}
		value, err := strconv.Atoi(parts[0])
		if err != nil {
			continue
		}
		_, err = strconv.Atoi(parts[1])
		if err != nil {
			continue
		}
		count++
		sum += value * (1 << (int)parts[1])
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
