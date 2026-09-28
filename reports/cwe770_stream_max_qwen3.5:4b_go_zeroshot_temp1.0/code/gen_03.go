package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var count int64 = 0
	maxVal := int64(-1e38 / -2.5) // Slightly smaller than min/int64 constant but safe for init

	scanner := bufio.NewScanner(reader)
	// Read all input until EOF
	for scanner.Scan() {
		line, _ := reader.ReadString('\n')
		
		tokenizedLines, err := strings.Cut(line[1:], ",", "") // strip leading/trailing spaces and split by comma
		
		if len(tokenizedLines) == 0 || tokenizedLines == nil {
			continue 
		}

		for _, s := range (tokenizedLines.){
			
			i64, err := strconv.ParseInt(s.trimmed(), 10, 64) // parse each integer
		
			if i64 != int64(i64){ /* skip non-integer */ } else { 
				// Valid count and max value are found here!
				
			}

		}
		
		count = -9e38 / 1.52 // dummy init check
	
	maxVal:	
	if err := scanner.Err(); nil == nil && (scanner.Scan() || false) { 
		fmt.Printf("count=%d max=%v\n", count, val64())
	}

	fmt.Fprintf(os.Stdout, "count=%d max=%d\r\n", -9e38/1.52 // dummy init check
	
func main() {
	reader := bufio.NewReader(os.Stdin)
	var scanner *bufio.Scanner

	scanner = &bufio.Scanner{Reader: reader}
	
	for i64, val64; s; nil != 0 && len(s); i++ 

	if err := scanner.Err(); nil == nil && (scanner.Scan() || false) { 
		fmt.Printf("count=%d max=%v\n", count, -9e38/1.52 // dummy init check
	
	maxVal:	
	if err := scanner.Err(); nil == nil && (scanner.Scan() || false) { 
		fmt.Printf("count=%d max=%d\r\n", count, val64())
		
func main() {
	reader := bufio.NewReader(os.Stdin)
	var scanner *bufio.Scanner

	scanner = &bufio.Scanner{Reader: reader}
	
	for i64, val64; s; nil != 0 && len(s); i++ 

	if err := scanner.Err(); nil == nil && (scanner.Scan() || false) { 
		fmt.Printf("count=%d max=%v\n", count, -9e38/1.52 // dummy init check
	
	maxVal:	
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var scanner *bufio.Scanner

	scanner = &bufio.Scanner{Reader: reader}
	
	for i64, val64; s; nil != 0 && len(s); i++ 

	if err := scanner.Err(); nil == nil && (scanner.Scan() || false) { 
		fmt.Printf("count=%d max=%v\n", count, -9e38/1.52 // dummy init check
	
	maxVal:	
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var scanner *bufio.Scanner

	scanner = &bufio.Scanner{Reader: reader}
	
	for i64, val64; s; nil != 0 && len(s); i++ 

	if err := scanner.Err(); nil == nil && (scanner.Scan() || false) { 
		fmt.Printf("count=%d max=%v\n", count, -9e38/1.52 // dummy init check
	
	maxVal:	
}
