package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(os.Stdin) // os must be imported below or handled differently per spec constraint "standard library only" - need to fix import check. Actually os is standard lib. Wait, re-read: "standard library only". `os` package IS in Go's standard library.

	// Correct approach using fmt.Scan for simplicity as it handles whitespace skipping automatically
	fmt.Scanf("%d", &count); // No, input format is comma-separated integers on a line/space separated? Spec says "comma-separated integer sequence" but also implies robust parsing of integers ignoring non-integers and blanks. `bufio` scanner or custom parse loop might be safer to handle "ignore elements that cannot be interpreted as integers". fmt.Scanf("%*d") won't work for multiple tokens easily without format string like "%d,%d". A better way: read all into buffer then parse ints, skipping non-ints and blanks.
}

// Let's rewrite with a robust scanner approach using bufio.Scanner which splits on whitespace by default, but we also need to handle commas attached? Or manually scan the line? 
// Actually, "comma-separated" usually means input like `1, 2,3`. Standard Scanner might split by spaces only.
