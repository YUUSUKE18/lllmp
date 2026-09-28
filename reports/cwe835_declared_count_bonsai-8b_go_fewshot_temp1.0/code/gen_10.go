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
	for {
		n, err := sc.ReadRune('\n')
		if err != nil {
			break
		}
		if strings.TrimSpace(string(n)) != "" {
			count++
			sum += parseInt(string(n))
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func parseInt(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	return n, nil
}
