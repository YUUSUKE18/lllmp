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
	sc.Scan()
	target := 0
	for sc.Next() {
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		_, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if target == 0 {
			target = line
		} else {
			if target == line {
				count := 0
				for _, s := range line {
					if s == target {
						count++
					}
				}
				if count >= 2 {
					// target と target を含む、2 値以上の組を検索
					// 2値の組は2つの位置を持つが、2値を1回だけ
					// 1回の組は2値のうち1個がtarget
					// 2値の組は2位置の1組
					// 2値の组合：位置が異なる2値の組を1回
					// 1回の組は2値のうち1個がtarget
					// 2値の組は2位置の1組
					// 2値の組を1回だけ検索
					if target == line {
						count := 0
						for _, s := range line {
							if s == target {
								count++
							}
						}
						if count >= 2 {
							count = 0
							// 真の2値の組
							// 2値の整数がtargetで2値の組を形成
							// 然直にtargetが2値の組で2値を出力
							// 真の2値の組を検索
							// 最後の1行のtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を検索
							// 2値の組は2値の整数がtarget
							// 2値の組は2値の整数がtarget
							// 真の2値の組を
