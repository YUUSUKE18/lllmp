package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil は標準入力として機能する（Go 1.20+ の仕様）
	if reader == nil {
		fmt.Fprintln(reader, "Error: No input available")
		return
	}

	var numbers []int64

	for line, err := fmt.Sscanf(strings.NewReader(""), "%d", &numbers); err != io.EOF || len(numbers) > 0; err = errors.New("input error"), nil {
		break
	}

	fmt.Println(fmt.Sprintf("%s %d", countSum(&numbers), numbers))
}
