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
		n, err := sc.Read([]byte{1})
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if err == io.EOF {
			break
		}
		sc.Scan(buf)
		if len(buf) == 0 {
			continue
		}
		if s, err := strings.FieldsN(buf, " "); err != nil {
			continue
		}
		if len(s) == 0 {
			continue
		}
		n, err := strconv.Atoi(s[0])
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
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
