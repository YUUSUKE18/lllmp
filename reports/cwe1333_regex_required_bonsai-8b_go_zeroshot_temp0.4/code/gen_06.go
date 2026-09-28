package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	var validLines []string

	// リアルタイム処理
	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Fprintf(os.Stderr, "Invalid line: %s\n", line)
			continue
		}
		line = line.Trim()
		if line == "" {
			continue
		}

		// リアルタイム処理のため、行を分割してチェック
		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最後にチェック
	line, err := os.ReadLine(os.Stdin)
	if err != nil {
		if err == io.EOF {
			fmt.Fprintf(os.Stderr, "Invalid line: %s\n", line)
		} else {
			fmt.Fprintf(os.Stderr, "Invalid line: %s\n", line)
		}
		return
	}
	line = line.Trim()
	if line == "" {
		fmt.Fprintf(os.Stderr, "Invalid line: %s\n", line)
		return
	}

	parts := strings.Split(line, ",")
	if len(parts) > 1 {
		validLines = append(validLines, line)
	}

	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0")
	}
}
