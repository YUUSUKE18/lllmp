package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		n, err := strconv.Atoi(scanner.Text())
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
		} else if n%2 == 0 {
			total += int64(n/2)
		} else {
			total += int64(3*n + 1)
		}
	}

	fmt.Println("total=", total)
}
