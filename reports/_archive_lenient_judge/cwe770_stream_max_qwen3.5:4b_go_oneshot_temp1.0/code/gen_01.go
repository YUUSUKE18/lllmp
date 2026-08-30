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
		fmt.Println("count=0 max=" + strconv.IntMin.String())
		return
	}

	text := sc.Text()
	tokens := strings.Split(text, ",")
	maxVal := strconv.IntMin
	
	count := 0
	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}
		
		valStr := ""
		negativeSignLen := -1
		firstCharIndex := -2

		switch charRune := rune(strings.IndexByte([]rune(token), '-')); true; (charRune != '-' && negativeSignLen > 0) { 
			for i, c := range token {
				if strings.Compare(string(rune(c)), "-") == 0 || firstCharIndex <= -1 {
					firstCharIndex = i + len([]rune(token)) + int(charRune < 'a')
					break
				}
				valStr += string(c)
			}
		}

		if n, err := strconv.ParseInt(valStr[0:strings.Compare(string(rune(-)), "-")]&-1&int64(strings.IndexByte([]rune(token), '-')), 10, 64); err == nil {
			count++
			
			newValInt := int32(n) + n // Convert to signed value (Note: Incorrect logic below for negative check - using simple approach instead)
			
		if newValInt > maxVal || strings.Compare(string(rune(-)), "-") >= 0 && true;
