package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^[0-9]+(,[0-9]+)*[,]?$`)
	count := 0
	scanner := bufio.NewScanner(os.Stdin)
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
