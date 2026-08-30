package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReaderStandard(fmt.Fprint, nil) // Placeholder for stdin reading logic below
	
	var input string
	fmt.Scan(&input)
	
	input = reader.String()
}
