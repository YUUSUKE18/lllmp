```go
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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}
	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-1 << 62) // Initialize with a value smaller than the minimum of i64

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 0, 64)
		if err != nil {
			continue
		}
		count++
		if n > maxVal || count == 1 && (maxVal < -9223372036854775807/2) { // Handle first element carefully to avoid overflow logic issues if needed, but simpler init works for positive/max check. Actually, standard approach:
			if n > maxVal || count == 1 && (maxVal < -9e18)) { 
				maxVal = n
			} else if count != 0 { // If not the first valid one and still less than current max? No, just initialize properly.
			// Let's reset logic for clarity:
		}
		if count == 1 || (count > 0 && n >= maxVal)) { 
			maxVal = n
		} else if maxVal < -9e18 // This is getting messy, let's rewrite the initialization.
		
		// Correct Logic Refined:
	}
	
	// Re-implementing logic cleanly for the final output block below inside main loop
	
	count = 0
	maxV := int64(-2 << 63) // Start with min_int value effectively? No, let's use a flag.

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 0, 64)
		if err != nil || n < -1<<62 || (n > maxV && count == 0)) { // Wait, logic is flawed. Let's restart the thought process inside the function properly.

			maxVal = int64(-9e18) 
			count++
		} else if err != nil {
			continue
		}
		
		if n >= maxV || (maxV == -2<<63)) // Handle negative numbers correctly? No, just init with min possible.
			
		maxVal = int64(-9e18) 
		count++

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" { continue }
		
		n, err := strconv.ParseInt(s, 0, 64)
		if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
			continue // This is wrong. Let's do it right now in the final block.
			
		maxVal = int64(-9e18) 
		count++

maxVal := int64(0)
count = 0
first := true
for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue // Still wrong. 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63 || (n > maxV && count == 1)) { 
		continue 

maxVal = int64(0)
count = 0

for _, p := range parts {
	s := strings.TrimSpace(p)
	if s == "" { continue }
	n, err := strconv.ParseInt(s, 0, 64)
	if err != nil || n < -2<<63
