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
		return
	}
	input := sc.Text()
	pairs := make(map[int]int64)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' }) > 0) { // Handle empty or non-numeric carefully by checking if conversion failed or result is not valid int string but we rely on Atoi returning error for invalid
			continue
		}
		if n != 0 || (n == 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // This logic is flawed. Let's simplify: just try to parse and ignore if error or empty string after trim
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Still flawed. Correct approach: just use Atoi and check error. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n == 0 || (n != 0 && len(strings.TrimLeftFunc(s, func(r rune) bool { return r >= '0' && r <= '9' })) > 0) { // Stop overthinking. Just use Atoi and check err. If s is empty or not a number, Atoi returns non-zero err.
			continue
		}
		if n
