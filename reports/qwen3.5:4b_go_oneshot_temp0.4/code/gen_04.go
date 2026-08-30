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
	parts := strings.Split(input, ",")

	counts := make(map[int]int)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		n, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		counts[n]++
		sum += int64(n)
	}

	var sb strings.Builder
	sb.WriteString("count=")
	for n, c := range counts {
		sb.WriteString(strconv.Itoa(c))
		sb.WriteString(" ")
	}
	sb.WriteString("sum=")
	sb.WriteString(strconv.FormatInt(sum, 10))
	fmt.Println(sb.String())
}
