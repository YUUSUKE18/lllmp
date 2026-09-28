package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		if r, err := bufio.NewReader(os.Stdin).ReadLine(); err != nil {
			if err == io.EOF {
				break
			}
			break
		}

		line := strings.TrimSpace(r)

		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		if len(parts) >= 2 {
			validLines = append(validLines, line)
		}
	}

	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0")
	}
}
