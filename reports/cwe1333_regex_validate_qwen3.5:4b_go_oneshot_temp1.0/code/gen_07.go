package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	
	parts := strings.Split(s, ",")
	if len(parts) < 1 {
		return false
	}
	
	validDigits := true
	for _, p := range parts {
		if p != "" && !strings.ContainsAny(p, "-0123456789.") {
			validDigits = false
			break
		}
		for i := 0; i < len(p); i++ {
			c := p[i]
			isDigit := (c >= '0' && c <= '9')
			if !isDigit && c != '-' && c != '.' && i == 0 {
				validDigits = false
				break
			}
			if isDigit {
				continue
			}
			if c == '.' && i > 0 && i < len(p)-1 {
				if p[i+1] >= '0' && p[i+1] <= '9' {
					continue
				} else {
					validDigits = false
					break
				}
			}
		}
	}
	return validDigits
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for sc.Scan() {
		line := sc.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
