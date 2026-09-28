package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var input, sum int
	reader := bufio.NewReader(os.Stdin)

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("Error reading input:", err)
			return
		}

		if len(line) == 0 || !isValidNumber(line) {
			continue
		}

		input, sum = processInput(line)
		fmt.Printf("total=%d\n", sum)
	}
}

func isValidNumber(s string) bool {
	for _, r := range s {
		if !isdigit(r) {
			return false
		}
	}
	return true
}

func processInput(input string) (int, int) {
	n := parseInt(input)
	sum := 0
	frequency := make(map[int]int)

	for n != 1 {
		frequency[n]++
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		sum += frequency[n]
	}

	return sum, sum + frequency[1]
}

func parseInt(s string) int {
	result, err := strconv.Atoi(s)
	if err != nil {
		fmt.Println("Error parsing input:", err)
	}
	return result
}
