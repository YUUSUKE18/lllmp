package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^\d+(?:,\d+)*(?:,$)?$`)
	scanner := bufio.NewScanner(os.Stdin)
	count := 0
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if re.MatchString(line) {
			count++
		}
	}
	fmt.Printf("valid=%d\n", count)
}
