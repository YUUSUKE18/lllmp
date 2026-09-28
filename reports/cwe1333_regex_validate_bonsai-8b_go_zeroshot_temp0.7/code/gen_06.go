package main

import (
	"fmt"
	"strings"
	"os"
)

func main() {
	scans := []string{}
	for {
		if !os.ReadToEnd(os.Stdin) {
			break
		}
		scans = append(scans, strings.TrimSpace(os.Stdin))
	}

	var validLines int
	for _, line := range scans {
		if strings.Contains(line, ",") && len(strings.Split(line, ","))-1 >= 1 {
			validLines++
		}
	}

	if validLines > 0 {
		fmt.Printf("valid=%d\n", validLines)
	}
}
