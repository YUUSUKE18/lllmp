package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validCount int
	var currentLine string

	for {
		sc.Scan()
		if !sc.Err() && !sc.eof() {
			currentLine = strings.TrimSpace(sc.Text())
		} else {
			if currentLine != "" {
				fields := strings.Fields(currentLine)
				if len(fields) > 1 {
					validCount++
				}
			}
			sc.Err()
			sc.Err()
			break
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
