package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	count := 0
	sum := int64(0)
	lineNum := 0

	for sc.Scan() {
		lineNum++
		if lineNum == 1 {
			fmt.Sscanf(sc.Text(), "%d", &count)
			continue
		}

		fields := bufio.NewScanner(os.Stdin) // This won't work as expected in a loop, need to restructure
		break 
	}
}
