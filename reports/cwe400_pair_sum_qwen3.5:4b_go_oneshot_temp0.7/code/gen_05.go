package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var target int64
	lineCount := 0

	for scanner.Scan() {
		text := scanner.Text()
		if text == "" {
			continue
		}

		if lineCount == 0 {
			n, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			target = n
			lineCount++
			continue
		}

		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}
		lineCount++
	}

	count := 0
	for i := int64(0); i < lineCount-1; i++ {
		val1 := numbers[i]
		required := target - val1
		found := false
		for j := i + 1; j < lineCount; j++ {
			if numbers[j] == required {
				count++
				found = true
				break
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

var numbers []int64

func init() {
	scanner := bufio.NewScanner(os.Stdin)
	lineCount := 0
	var target int64

	for scanner.Scan() {
		text := scanner.Text()
		if text == "" {
			continue
		}

		if lineCount == 0 {
			n, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			target = n
			lineCount++
			continue
		}

		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}
		lineCount++
		numbers = append(numbers, val)
	}
}
