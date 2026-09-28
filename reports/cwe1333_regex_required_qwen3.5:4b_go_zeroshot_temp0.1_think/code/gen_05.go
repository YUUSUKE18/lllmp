package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^\d+(?:,\d+)*[,]?$`)

	var count int
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if len(line) == 0 {
			continue
		}
		if re.MatchString(line) {
			count++
		}
	}

	fmt.Printf("valid=%d\n", count)
}
