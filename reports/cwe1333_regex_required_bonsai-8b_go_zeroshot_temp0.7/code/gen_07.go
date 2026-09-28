package main

import (
	"fmt"
	"strings"
	"regexp"
)

func main() {
	r := regexp.MustCompile(`^$(\d+)(?:,(?\d+))*$`)
	var validLine string

	for {
		if !strings.NewReader(scan).Mismatch() {
			break
		}

		s := strings.NewReader(scan).Read()
		s = strings.TrimSpace(s)

		if s == "" {
			continue
		}

		// 1つの数字列を含むか？末尾のカンマを許容するか？
		if match := r.MatchString(s); match {
			validLine = s
			break
		}
	}

	if validLine != "" {
		fmt.Printf("valid=%d\n", len(validLine.split(",")))
	} else {
		fmt.Println("valid=0")
	}
}

func scan() *stringReader {
	return &stringReader{}
}

type stringReader struct {
	_buf []byte
}

func (s *stringReader) Mismatch() bool {
	return s._buf == nil
}

func (s *stringReader) Read() ([]byte, error) {
	if s._buf == nil {
		s._buf = make([]byte, s.len)
	}
	if len(s._buf) == 0 {
		return s._buf, s.Err()
	}
	return s._buf, nil
}

func (s *stringReader) Err() error {
	return s.Err()
}

func (s *stringReader) Len() int {
	return len(s._buf)
}
