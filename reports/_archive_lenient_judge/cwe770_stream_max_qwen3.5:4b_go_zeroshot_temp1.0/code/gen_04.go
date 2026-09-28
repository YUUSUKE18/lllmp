package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReaderStdin()
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	count := 0
	maxValue := int64(-1<<63 - 2) // initialize with a value smaller than minInt64 to ensure valid output even for empty input

	for _, char := range line {
		if char == ',' || ' ' <= char && char <= '~' || '\n' == char {\n\tt\
			continue
		} else if (char >= '0') \&&& (char <= '9') \{
\ntemp, err := strconv.ParseInt(string(char), 10, 64)

if temp != nil { count++; max = int64(temp); }
else { 
\tt\maxValue = int64(-1<<63 - 2) // fallback for empty input case
} else \{ \n\ntmpInt := int64(0)\ if (temp > maxValue){ \ntemp\nmaxValue=temp; \tnodecount++;\ }

if err != nil { return }}

fmt.Printf("count=%d max=%s %d\n", count, strconv.FormatInt(maxValue))
