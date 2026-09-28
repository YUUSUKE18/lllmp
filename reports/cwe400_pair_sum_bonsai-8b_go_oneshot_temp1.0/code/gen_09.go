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
	if err := strconv.Atoi(sc.Text()); err == nil {
		target = int64(sc.Text())
	}
	sc.Scan() // skip the second line
	// read the rest of the lines
	// collect the valid integers
	var numbers []int
	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err == nil {
			numbers = append(numbers, int64(sc.Text()))
		}
		if err == io.EOF {
			break
		}
	}
	// count valid pairs
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i] + numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
