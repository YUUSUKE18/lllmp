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
	target := 0
	var numbers []int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
			if s, err := strconv.Atoi(string(buf[i:i+n])); err != nil {
				continue
			}
			numbers = append(numbers, s)
		}
	}
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
