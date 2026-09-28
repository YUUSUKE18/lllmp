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
		if n == 0 {
			continue
		}
		s := string(buf)
		if strings.TrimSpace(s) == "" {
			continue
		}
		val, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		numbers = append(numbers, val)
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
