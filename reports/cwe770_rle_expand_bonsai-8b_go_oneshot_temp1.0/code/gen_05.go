package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var elements []string
	for element := range strings.Fields(sc.Text()) {
		if strings.HasPrefix(element, "value:") {
			valStr, _ := strings.SplitN(element, ":", 2)
			val, _ := strconv.Atoi(valStr)
			countStr, _ := strings.SplitN(element[1:], ":", 2)
			count, _ := strconv.Atoi(countStr)
			if count > 0 {
				for i := 0; i < count; i++ {
					fmt.Print(val)
					if i+1 < count {
						fmt.Print(",")
					}
				}
			}
		}
	}

	var count = 0
	var sum = 0
	for element := range strings.Fields(sc.Text()) {
		if strings.HasPrefix(element, "value:") {
			valStr, _ := strings.SplitN(element, ":", 2)
			val, _ := strconv.Atoi(valStr)
			countStr, _ := strings.SplitN(element[1:], ":", 2)
			count, _ = strconv.Atoi(countStr)
			if count > 0 {
				sum += val * count
				count = 0
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
