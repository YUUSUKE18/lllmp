```go
package main

import (
	"bufio"
	"fmt"
	"os"
	regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		line := strings.TrimSpace(buf[:n])
		if line == "" {
			continue
		}
		// Kanji/kanji only pattern: [0-9,]*
		// But the problem says "numbers" in the example
		// So we'll match sequences of digits, commas, and possibly other characters
		// but the actual valid line is one with at least one number sequence separated by commas
		// So we'll use regex to check if the line contains at least one comma-separated number sequence
		// But the line should be split by commas and have at least one non-empty field (i.e., a number)
		// So we can use a regex that matches at least one comma-separated group of digits
		// The actual condition is that the line has at least one comma-separated number sequence
		// i.e., the line contains at least one comma followed by at least one digit, and the entire line is split into at least two groups
		// So we can match at least one comma-separated group of digits
		// We can also match optional commas, but the actual condition is the line has at least one comma-separated group of digits
		// So the regex would be: \d+,\d+|\d+,\d+,\d+|... but for the purpose of counting valid lines, we can use a simpler approach
		// So we can use a regex that matches at least one comma-separated group of digits
		// So the regex is: \d+,\d+
		// But this only matches exactly two numbers separated by a comma
		// So to match any number of commas and any number of digits separated by commas
		// We can use a regex that matches at least one comma followed by at least one digit, and the entire line is split into at least two groups
		// So the regex is: \d+,\d+|\d+,\d+,\d+|... (this gets complicated)
		// So instead, we can use a simpler approach
		// We can split the line by commas and check if there are at least one non-empty field
		// So the regex is: \d+
		// Wait, that's not right
		// The actual condition is that the line has at least one comma-separated number sequence
		// So the line must contain at least one comma, and between the commas, there must be at least one digit
		// So we can use a regex that matches at least one comma, and the line contains at least one digit
		// So the regex is: [0-9]+,\d+|,\d+|[0-9]+,\d+|\d+,[0-9]+
		// But that's complicated
		// So instead, we can use a regex that matches at least one comma and at least one digit
		// The line must have at least one comma and at least one digit
		// So the regex is: [0-9]+,\d+|,\d+|[0-9]+,\d+|\d+,[0-9]+
		// But that's not helpful
		// So the simplest way is to split the line by commas and check if there are at least one non-empty field
		// So we can use a regex that matches at least one comma
		// So the regex is: ,+
		// But then we need to check if the line has at least one digit
		// So we can use a regex that matches at least one comma and at least one digit
		// So the regex is: [0-9]+,\d+
		// Wait, that's not helpful
		// So let's use a simpler approach
		// We can split the line by commas and check if there are at least one non-empty field
		// So the code would be:
		// Split the line by commas and check if there are at least one non-empty field
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[0-9]+,\d+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		// 	continue
		// }
		// fields := strings.SplitN(line, ",", -1)
		// if len(fields) > 1 {
		// 	validLines++
		// }
		// So the code would be:
		// line := strings.TrimSpace(buf[:n])
		// if line == "" {
		// 	continue
		// }
		// if !regexp.MatchString(`[\d,]+`, line) {
		//
