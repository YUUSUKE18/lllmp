```go
package main

import (
	"fmt"
	"math"
	"os"
	"strings"
	"sync"
)

type MemoizedMap struct {
	m map[int]int
}

func (m *MemoizedMap) get(k int) (int, error) {
	if k in m.m {
		return m.m[k], nil
	}
	return 0, fmt.Errorf("key %d not found in memo", k)
}

func (m *MemoizedMap) set(k int, v int) error {
	if k in m.m {
		return fmt.Errorf("key %d already set", k)
	}
	m.m[k] = v
	return nil
}

func computeSteps(n int, memo *MemoizedMap) (int, error) {
	if n == 1 {
		return 0, nil
	}
	if val, err := memo.get(n); err != nil {
		return val, err
	}
	if val == 1 {
		return 0, nil
	}
	if val == 2 {
		return 1, nil
	}
	if val == 4 {
		return 2, nil
	}
	if val == 8 {
		return 3, nil
	}
	if val == 16 {
		return 4, nil
	}
	if val == 32 {
		return 5, nil
	}
	if val == 64 {
		return 6, nil
	}
	if val == 128 {
		return 7, nil
	}
	if val == 256 {
		return 8, nil
	}
	if val == 512 {
		return 9, nil
	}
	if val == 1024 {
		return 10, nil
	}
	if val == 2048 {
		return 11, nil
	}
	if val == 4096 {
		return 12, nil
	}
	if val == 8192 {
		return 13, nil
	}
	if val == 16384 {
		return 14, nil
	}
	if val == 32768 {
		return 15, nil
	}
	if val == 65536 {
		return 16, nil
	}
	if val == 131072 {
		return 17, nil
	}
	if val == 262144 {
		return 18, nil
	}
	if val == 524288 {
		return 19, nil
	}
	if val == 1048576 {
		return 20, nil
	}
	if val == 2097152 {
		return 21, nil
	}
	if val == 4194304 {
		return 22, nil
	}
	if val == 8388608 {
		return 23, nil
	}
	if val == 16777216 {
		return 24, nil
	}
	if val == 33554432 {
		return 25, nil
	}
	if val == 67108864 {
		return 26, nil
	}
	if val == 134217728 {
		return 27, nil
	}
	if val == 268435456 {
		return 28, nil
	}
	if val == 536870912 {
		return 29, nil
	}
	if val == 1073741824 {
		return 30, nil
	}
	if val == 2147483648 {
		return 31, nil
	}
	if val == 4294967296 {
		return 32, nil
	}
	if val == 8589934592 {
		return 33, nil
	}
	if val == 17179869184 {
		return 34, nil
	}
	if val == 34359738368 {
		return 35, nil
	}
	if val == 68719476736 {
		return 36, nil
	}
	if val == 137438953472 {
		return 37, nil
	}
	if val == 274877906944 {
		return 38, nil
	}
	if val == 549755813888 {
		return 39, nil
	}
	if val == 1099511627776 {
		return 40, nil
	}
	if val == 2199023255552 {
		return 41, nil
	}
	if val == 4398046511104 {
		return 42, nil
	}
	if val == 8796093022208 {
		return 43, nil
	}
	if val == 17592186044416 {
		return 44, nil
	}
	if val == 35184372088832 {
		return 45, nil
	}
	if val == 70368744177664 {
		return 46, nil
	}
	if val == 140737488355328 {
		return 47, nil
	}
	if val == 281474976710656 {
		return 48, nil
	}
	if val == 562949953421312 {
		return 49, nil
	}
	if val == 1125899906842624 {
		return 50, nil
	}
	if val == 2251799813685248 {
		return 51, nil
	}
	if val == 4503599627370496 {
		return 52, nil
	}
	if val == 9007199254740992 {
		return 53, nil
	}
	if val == 18014398509481984 {
		return 54, nil
	}
	if val == 36028797018963968 {
		return 55, nil
	}
	if val == 72057594037927936 {
		return 56, nil
	}
	if val == 144115188075855872 {
		return 57, nil
	}
	if val == 288230376151711744 {
		return 58, nil
	}
	if val == 576460752303423488 {
		return 59, nil
	}
	if val == 1152921504606846976 {
		return 60, nil
	}
	if val == 2305843009213693952 {
		return 61, nil
	}
	if val == 4611686018427387904 {
		return 62, nil
	}
	if val == 9223372036854775808 {
		return 63, nil
	}
	if val == 18446744073709551616 {
		return 64, nil
	}
	if val == 36893488147419103232 {
		return 65, nil
	}
	if val == 73786976294838206464 {
		return 66, nil
	}
	if val == 147573952589676412928 {
		return 67, nil
	}
	if val == 295147905179352825856 {
		return 68, nil
	}
	if val == 590295810358705651712 {
		return 69, nil
	}
	if val == 1180591620717411303424 {
		return 70, nil
	}
	if val == 2361183241434
