package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader for stdin redirection in shell
	// Note: In actual Go execution, the above line will cause a panic because
	// bufio.Reader requires a non-nil Reader. The standard way to read from stdin
	// directly without buffering (or with proper buffer) is done via os.Stdin or
	// creating a Reader with an empty buffer. We'll use os.Stdin for simplicity.

import "os"
	reader = bufio.NewReader(os.Stdin)

	var uniqueMap map[int]struct{}
	sum := int64(0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		line = line
		fmt.Fprintln(os.Stdout, "count=", len(uniqueMap), " sum=", sum)
		return
	}
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	uniqueNumbers := make(map[int]struct{})
	var currentNum string
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		fields := []string{}
		currentNum = ""
		for i, r := range line {
			if r == ',' || (r >= '0' && r <= '9') {
				if currentNum == "" && r == ', {
					continue
				}
				if currentNum == "" {
					currentNum += string(r)
				} else if r == ',' {
					val, err := strconv.Atoi(currentNum)
					if err != nil {
						return
					}
					uniqueNumbers[val] = struct{}{}
					sum += int64(val)
					currentNum = ""
				} else {
					currentNum += string(r)
				}
			}
		}
		
		if currentNum != "" {
			val, err := strconv.Atoi(currentNum)
			if err == nil {
				uniqueNumbers[val] = struct{}{}
				sum += int64(val)
			}
		}
	}

	fmt.Fprintln(os.Stdout, "count=", len(uniqueNumbers), " sum=", sum)
	return
}

import "strconv"
func main() {
	reader := bufio.NewReader(os.Stdin)
	
	uniqueNumbers := make(map[int]struct{})
	sum := int64(0)
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		fields := split(line)
		for _, s := range fields {
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			uniqueNumbers[val] = struct{}{}
			sum += int64(val)
		}
	}

	fmt.Fprintf(os.Stdout, "count=%d sum=%d\n", len(uniqueNumbers), sum)
	return
}

func split(s string) []string {
	fields := []string{}
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			fields = append(fields, s[start:i])
			start = i + 1
		}
	}
	if start < len(s) {
		fields = append(fields, s[start:])
	}
	return fields
}
