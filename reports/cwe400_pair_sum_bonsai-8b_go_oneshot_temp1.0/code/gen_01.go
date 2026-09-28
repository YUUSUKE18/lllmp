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
	target := 0
	first := true
	pairs := 0
	var numbers []int

	for _, line := range strings.Fields(sc.Text()) {
		if first {
			_, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			target = line
			first = false
		} else {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			numbers = append(numbers, n)
		}
	}

	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == int(target) {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
