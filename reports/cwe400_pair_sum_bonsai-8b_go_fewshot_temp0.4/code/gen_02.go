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
		target = strconv.Atoi(sc.Text())
	}
	sc.Scan()
	pairs := 0
	numbers := []int{}
	for {
		n, err := sc.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if err := strconv.Atoi(buf[:n]); err == nil {
			numbers = append(numbers, strconv.Atoi(buf[:n]))
		}
		sc.Scan()
	}
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
