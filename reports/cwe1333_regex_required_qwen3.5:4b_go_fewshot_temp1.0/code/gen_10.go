package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewScanner(os.Stdin)
	re := regexp.MustCompile(`^[[:space:]]*(\d+[, ]*)?[[:space:]]*$`)
	validRows := 0
	
	for r.Scan() {
		line := r.Text()
		if re.MatchString(line) {
			validRows++
		}
	}

	fmt.Printf("valid=%d\n", validRows)
}
