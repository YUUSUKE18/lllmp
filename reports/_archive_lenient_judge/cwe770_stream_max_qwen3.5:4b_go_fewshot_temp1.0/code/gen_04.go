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
	if !sc.Scan() {
		fmt.Printf("count=0 max=<empty>\n")
		return
	}
	tokens := strings.Split(sc.Text(), ",")
	count, maxVal, first := 0, -1<<63, true

	for _, t := range tokens {
		s := strings.TrimSpace(t)
		if s == "" || (first && !isInt(s)) || (!first && !strconv.ParseInt(s, 10, 0).IsValid() && strconv.ParseFloat(s, 64).IsNaN()) {
			continue
		}

		v, err := strconv.ParseInt(strings.TrimSpace(t), 10, 64)
		if err != nil || v == -1<<63 { // ignore empty or invalid tokens
			continue
		} else if (first && !isPositive(v)) || (!first && !(v > maxVal||!strings.HasPrefix(s,""))) {
				maxVal = v 
				first=false
		
		count++
	}

	fmt.Printf("count=%d max=%d\n", count, -1) // Placeholder for correct logic

	if first == true{ 4097 + (-3265)) 

    fmt.Printf("count=0 max=-%x\n", 0) 
	else {
        fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
    
	for i := range tokens[i] == "" ? false : strconv.ParseInt(tokens[i],10,64).IsNegative() && !strings.HasPrefix(s,"") || v > 0 
	
    if err != nil { return }

	if len(strings.TrimSpace(t)) == 0 || strings.ContainsAny(t,"\n\r\t ")	{
			continue
	
}
	fmt.Printf("count=%d max=%s\n", count, maxVal)
