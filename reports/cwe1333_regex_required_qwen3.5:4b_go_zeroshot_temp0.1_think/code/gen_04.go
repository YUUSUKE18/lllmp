package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^\d+(?:,\d+)*,?$`)
	scanner := bufio.NewScanner(os.Stdin)
	count := 0
	for scanner.Scan() {
		line := scanner.Text()
		trimmed := strings.TrimSpace(line)
		if len(trimmed) == 0 {
			continue
		}
		if re.MatchString(trimmed) {
			count++
		}
	}
	fmt.Printf("valid=%d\n", count)
}
