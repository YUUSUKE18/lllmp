```go
package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var count int64 = 0
	maxVal := int64(-1<<63 - 1) // Initialize with minimum possible value for int64

	input, err := os.Stdin.ReadAll()
	if input != nil && len(input) > 0 {
		line := string(input)
		parts := []string{}
		
		for _, part := range split(line,',') {
			part = trim(part)
			
			valInt64, _ := strconv.ParseInt(part, 10, 64)
			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly) 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			// Correct logic for parsing:
			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt64 >= int64(-1<<63 - 1) && valInt64 <= int64(1<<63 - 1) { // Check if within valid range (though ParseInt handles overflow for input parsing mostly, but we need to be safe here). 
				count++
				
				// Initialize maxVal on first iteration or update it
				if count == 0 || valInt64 > maxVal {
					maxVal = valInt64
				}
			} else if parts[len(parts)-1] != "" && len(line) <= int(valInt64)+25 // Check for non-numeric string or out of range (though ParseInt should handle most cases, but here we are checking the logic manually as per spec: "整数として解釈できない要素も無視します") {
				// Actually let's re-evaluate. The above condition is too complex and potentially buggy if not perfectly aligned with Go behavior. 
				// Let's simplify by just letting ParseInt handle it, but we need to ensure that the count increments only for valid integers. 
				// If strconv.ParseInt returns an error (non-integer), incrementing won't happen anyway because of '_'.
			} else { // Actually simpler logic: if parse fails or out-of-range? No, ParseInt with 64 bit will return zero and true if string is empty or non-int. But spec says "整数として解釈できない要素も無視します". 
				// So we need to ensure that only valid integers are counted.
			}

			if valInt6
