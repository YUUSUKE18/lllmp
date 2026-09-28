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
	countStr, _ := strings.Fields(sc.Text())
	count, _ := strconv.Atoi(countStr)
	total := 0
	line := ""
	for {
		if !sc.Scan() {
			break
		}
		line += fmt.Sprintf("%s", sc.Text())
		sc.Scan()
		if len(line) == 0 {
			break
		}
		for _, numStr := range strings.Fields(line) {
			n, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}
			total += n
		}
		line = ""
	}
	fmt.Printf("count=%d sum=%d\n", count, total)
}
