package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	first = true

	for {
		line, err := sc.Scan()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first {
			first = false
			numbers = []int{n}
		} else {
			numbers = append(numbers, n)
		}
	}

	if len(numbers) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}

	target := 0
	count := 0
	for _, n := range numbers {
		if n == target {
			count++
		}
		if count == 2 {
			break
		}
	}
	if count == 2 {
		fmt.Printf("pairs=1\n")
	} else {
		fmt.Printf("pairs=0\n")
	}
}
