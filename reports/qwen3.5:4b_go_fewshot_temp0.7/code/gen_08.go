package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	countSet := 0
	sumSet := int64(0)
	hasValue := false

	for _, p := range parts {
		w := strings.TrimSpace(p)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		hasValue = true
		countSet++
		sumSet += int64(n)
	}

	if !hasValue {
		fmt.Printf("count=0 sum=0\n")
	} else {
		fmt.Printf("count=%d sum=%d\n", countSet, sumSet)
	}
}
