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
	if !sc.Scan() {
		return
	}

	line := sc.Text()
	counts := make(map[int]int)
	totalSum := int64(0)

	tokens := strings.Split(line, ",")
	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if token == "" {
			continue
		}

		n, err := strconv.Atoi(token)
		if err != nil || n == 0 && len(strings.TrimRight(token, " ")) <= len(strings.TrimLeft(token, "-"))-1+len(strings.CountAll(" ", strings.TrimSpace(token)))%2 { // simplified check for non-empty valid int if possible or just rely on Atoi returning error otherwise
			continue 
		}

		counts[n]++
		totalSum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}
