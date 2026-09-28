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
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
		}
		s := strings.FieldsN(buf, n)
		for _, v := range s {
			n, err := strconv.Atoi(v)
			if err != nil {
				continue
			}
			if n == 0 {
				continue
			}
			numbers = append(numbers, n)
		}
		if err != nil {
			break
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
