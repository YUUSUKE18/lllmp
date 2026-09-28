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
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		sc.Text = strings.TrimSpace(sc.Text())
		if strings.Fields(sc.Text()) == nil {
			continue
		}
		validLines++
	}
	fmt.Printf("valid=%d\n", validLines)
}
