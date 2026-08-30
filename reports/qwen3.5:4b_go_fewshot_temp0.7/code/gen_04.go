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
	numbers := strings.Split(input, ",")

	count := 0
	sum := int64(0)

	for _, w := range numbers {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}

		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}

		count++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
