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
	var target string
	sc.Scan()
	sc.Scan()
	var numbers []int
	for {
		if !sc.HasMore() {
			break
		}
		line := strings.Fields(sc.Text())
		if len(line) == 0 {
			continue
		}
		if len(line) > 1 {
			n, err := strconv.Atoi(line[1])
			if err != nil {
				continue
			}
			numbers = append(numbers, n)
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
