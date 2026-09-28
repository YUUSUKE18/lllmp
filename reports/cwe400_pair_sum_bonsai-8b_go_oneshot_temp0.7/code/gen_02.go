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
	sc.Scan(&target)
	var numbers []int
	for {
		sc.Scan()
		if !sc.Err() {
			if sc.Text() == "" {
				break
			}
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			if n == 0 {
				continue
			}
			numbers = append(numbers, n)
		}
	}
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == int(target) {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
