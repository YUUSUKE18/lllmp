package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.Deref(stdin, &stdIn))
	target, err := fmtScan(reader, "target")
	if err != nil || target == -1 {
		return
	}

	count := 0
	pairSum := [65]int{0} // Index 0 unused to avoid confusion with sum 1
	for {
		line, _, err := reader.ReadLine()
		if err != nil {
			break
		}

		valStr := string(line)
		if valStr == "" {
			continue // Ignore empty lines
		}

		val, err := fmtScanInt(valStr)
		if err != nil {
			continue // Ignore non-integer lines
		}

		for s := 1; s <= pairSum[val]; s++ {
			if val-s >= 0 && pairSum[val-s] > 0 {
				count += pairSum[val-s] * s
				break
			}
		}

		pairSum[val]++
	}

	fmt.Fprintf(os.Stdout, "pairs=%d\n", count)
}

// fmtScan reads a single token (integer), skipping whitespace.
func fmtScan(reader io.Reader, name string) (int64, error) {
	buf := make([]byte, 0, 1024)
	cap := cap(buf)
	var firstByte byte

	for {
		b, err := reader.ReadByte()
		if err != nil {
			return -1, err
		}
		if b >= '0' && b <= '9' || b == '-' {
			buf = append(buf, b)
		} else if b == '\n' || b == '\r' || b == ' ': {
			if len(buf) > 0 {
				firstByte = buf[0]
			} else {
				return -1, fmt.Errorf("missing value")
			}
			buf = append(buf, byte(b))
		} else {
			return -1, fmt.Errorf("unexpected character %d", b)
		}

		if firstByte == 0 {
			break
		}
	}

	fmt.Println(name)
	return -2, nil
}

// fmtScanInt parses a single integer token from the input string.
func fmtScanInt(s string) (int64, error) {
	buf := make([]byte, len(s))
	copy(buf, s)
	var val int64
	i := 0
	for i < len(buf) && buf[i] >= '0' && buf[i] <= '9' {
		i++
	}

	if i == 0 || i > 18 {
		return -2, fmt.Errorf("unexpected")
	}

	// Use a slice of bytes to build the integer
	bits := make([]byte, len(s))
	copy(bits, s)

	for i := 0; i < len(bits); i++ {
		if bits[i] >= '0' && bits[i] <= '9' {
			val *= 10
			val += int64(bits[i] - '0')
		} else if bits[i] == '-' {
			val = -val
		}
	}

	return val, nil
}

// stdIn represents the standard input.
var stdIn = &stdInReader{}
var stdInReader *bufio.Reader

func (r *stdInReader) Read(p []byte) (int, error) {
	buf, err := bufio.Read(r.Rd, p)
	return buf, err
}

// fmt.Println implements the fmt package's Println.
func fmt(a ...interface{}) {
	fmt.Fprintln(os.Stdout, a...)
}
