package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	total := 0

	for scanner.Scan() {
		if scanner.Text() == "" {
			continue
		}

		n, err := strconv.Atoi(scanner.Text())
		if err != nil {
			continue
		}

		count := 0
		for n != 1 {
			count++
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
		}

		total += count
	}

	fmt.Println("total=", total)
}
