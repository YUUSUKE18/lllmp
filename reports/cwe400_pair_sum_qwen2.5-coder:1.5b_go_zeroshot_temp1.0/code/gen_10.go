package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	target, _ := reader.ReadString('\n')

	count := 0
	for _, line := range reader.Lines() {
		if line == "" {
			continue
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if math.Abs(float64(target)-float64(num)) < 0.001 {
			count++
		}
	}
	fmt.Println("pairs=", count)
}
