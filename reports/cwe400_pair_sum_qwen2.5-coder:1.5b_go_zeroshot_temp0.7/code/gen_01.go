package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var target int64
	fmt.Scan(&target)

	scanner := bufio.NewScanner(os.Stdin)
	count := 0

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if target-num == num {
			count++
		}
	}

	fmt.Println("pairs=" + strconv.Itoa(count))
}
