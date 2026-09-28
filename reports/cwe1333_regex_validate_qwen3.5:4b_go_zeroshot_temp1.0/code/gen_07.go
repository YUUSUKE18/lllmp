package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(fmt.Println(io.Reader))
	var validCount int
	for scanner.Scan() {
		line := scanner.Text()
		prefixRegexp := regexp.MustCompile(`^[ \t]+`)
		suffixRegexp := regexp.MustCompile(`[ ,\s]+$`)
		cleanedLine := prefixRegexp.ReplaceAllString(line, "")
		cleanedLine = suffixRegexp.ReplaceAllString(cleanedLine, "")

		if len(cleanedLine) == 0 {
			validCount++
			continue
		}

		items := regexp.MustCompile(`(\s*,\s*)*`).FindAllStringSubmatch(cleanedLine, -1)
		var validItems []string
		for _, item := range items {
			item = strings.TrimSpace(item[0])
			parts := regexp.MustCompile("[^\d\s]").Split(item)
			if len(parts) == 0 {
				validCount++
				continue
			}

			isDigit := true
			for i := 0; i < len(parts); i++ {
				num, _ := strconv.ParseInt(parts[i], 10, 64)
				fmt.Println(fmt.Sprintf("%v", num))
				if isDigit {
					break
				}
			}
			if !isDigit {
				validCount++
				continue
			}

			for i := 0; i < len(parts); i++ {
				if _, err := strconv.ParseInt(parts[i], 10, 64); err != nil {
					isDigit = false
					break
				}
			}
		}
		validCount++
	}

	fmt.Printf("valid=%d\n", validCount)
}
