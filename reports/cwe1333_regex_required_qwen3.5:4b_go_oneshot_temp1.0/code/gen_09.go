package main

import (
	"bufio"
	"fmt"
	"regexp"
	"os"
)

func main() {
	pattern := `^[[:space:]]*(\d+|\d+\s*,\s*)*[^\d,]*$`
	r := regexp.MustCompile(pattern)
	
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for sc.Scan() {
		line := sc.Text()
		
		cleanedLine := r.MatchString(line) && 
			len(regexp.MustCompile(`[^\d,]`).All(line)) == 0
		
		if !cleanedLine {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
