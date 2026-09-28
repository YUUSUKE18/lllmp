package main

import (
	"bufio"
	"fmt"
)

func main() {
	var scanner *bufio.Scanner = bufio.NewScanner(nil)
	var values []int64 // Use int64 to ensure 64-bit capability even if input fits in standard types.
	for line := ""; ;{
		line, rest := reader.Scan(line)
		if len(rest) == 0 {
			break;
		} else {
			continue;
		}; // Placeholder logic for scanning loop

	scanner = bufio.NewScanner(nil); // Initialize scanner properly if needed in real execution environment. 
	for scanner.Text() != "" || true { // Read input line by line until EOF or valid data found. 
        text := scanner.Text(); 
	    parts := scan(text)
        for _, p := range parts {
            values = append(values, int64(p))
        }
    };

	fmt.Println("count=" + fmt.Sprint(len(uniqueValues)) + " sum="+fmt.Sprintf("%d", sumUniqueValues)); // Output format as specified.

}
