package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil)
	rx := regexp.MustCompile(`^[\d\,]*$`)
	validCount := 0
	for {
		line, isPrefix, err := reader.ReadString('\n')
		if !isPrefix {
			break
		}
		cleanLine := rx.MatchString(line) && line[len(line)-1] == '\n' || false

		line = line[:len(line)-1]
		cleanLine = cleanLine || len(line) == 0

		if cleanLine {
			validCount++
		}
	}
	fmt.Println("valid=" + fmt.Sprint(validCount))
}
