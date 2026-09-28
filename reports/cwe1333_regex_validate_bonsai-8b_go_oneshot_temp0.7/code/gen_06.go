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
	var validLines int
	for _; !sc.Done(); {
		sc.Scan()
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		// ルートンを割って数字のみをチェック
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			continue
		}
		valid := true
		for _, p := range parts {
			if len(p) == 0 {
				valid = false
				break
			}
			if !strconv.Atoi(p) {
				valid = false
				break
			}
		}
		if valid {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
