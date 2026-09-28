package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	re := regexp.MustCompile(`^[ ,0-9]+($|[,])$`)

	validCount := 0
	for scanner.Scan() {
		line := scanner.Text()
		if re.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
