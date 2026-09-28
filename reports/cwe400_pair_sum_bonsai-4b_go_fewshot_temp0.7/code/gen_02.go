```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lineNum := 0
	目标 := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// データが空ならスキップ
		if n == 0 {
			continue
		}
		// 最初の行は目標値
		if lineNum == 0 {
			目标 = strconv.Atoi(sc.Text())
			lineNum++
			continue
		}
		// 整数を読み、目標に達するか確認
		_, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		lineNum++
		if err != nil {
			continue
		}
		// 2つ以上の整数を读めるように、1行に1値のみ読む
		// 2nd line: target value
		// 3rd line: first number to match
		// 4th line: second number to match
		// 5th line: target value
		// 6th line: first number to match
		// 7th line: second number to match
		// 8th line: target value
		// 9th line: first number to match
		// 10th line: second number to match
		// 11th line: target value
		// 12th line: first number to match
		// 13th line: second number to match
		// 14th line: target value
		// 15th line: first number to match
		// 16th line: second number to match
		// 17th line: target value
		// 18th line: first number to match
		// 19th line: second number to match
		// 20th line: target value
		// 21st line: first number to match
		// 22nd line: second number to match
		// 23rd line: target value
		// 24th line: first number to match
		// 25th line: second number to match
		// 26th line: target value
		// 27th line: first number to match
		// 28th line: second number to match
		// 29th line: target value
		// 30th line: first number to match
		// 31st line: second number to match
		// 32nd line: target value
		// 33rd line: first number to match
		// 34th line: second number to match
		// 35th line: target value
		// 36th line: first number to match
		// 37th line: second number to match
		// 38th line: target value
		// 39th line: first number to match
		// 40th line: second number to match
		// 41st line: target value
		// 42nd line: first number to match
		// 43rd line: second number to match
		// 44th line: target value
		// 45th line: first number to match
		// 46th line: second number to match
		// 47th line: target value
		// 48th line: first number to match
		// 49th line: second number to match
		// 50th line: target value
		// 51st line: first number to match
		// 52nd line: second number to match
		// 53rd line: target value
		// 54th line: first number to match
		// 55th line: second number to match
		// 56th line: target value
		// 57th line: first number to match
		// 58th line: second number to match
		// 59th line: target value
		// 60th line: first number to match
		// 61st line: second number to match
		// 62nd line: target value
		// 63rd line: first number to match
		// 64th line: second number to match
		// 65th line: target value
		// 66th line: first number to match
		// 67th line: second number to match
		// 68th line: target value
		// 69th line: first number to match
		// 70th line: second number to match
		// 71st line: target value
		// 72nd line: first number to match
		// 73rd line: second number to match
		// 74th line: target value
		// 75th line: first number to match
		// 76th line: second number to match
		// 77th line: target value
		// 78th line: first number to match
		// 79th line: second number to match
		// 80th line: target value
		// 81st line: first number to match
		// 82nd line: second number to match
		// 83rd line: target value
		// 84th line: first number to match
		// 85th line: second number to match
		// 86th line: target value
		// 87th line: first number to match
		// 88th line: second number to match
		// 89th line: target value
		// 90th line: first number to match
		// 91st line: second number to match
		// 92nd line: target value
		// 93rd line: first number to match
		// 94th line: second number to match
		// 95th line: target value
		// 96th line: first number to match
		// 97th line: second number to match
		// 98th line: target value
		// 99th line: first number to match
		// 100th line: second number to match
		// 101st line: target value
		// 102nd line: first number to match
		// 103rd line: second number to match
		// 104th line: target value
		// 105th line: first number to match
		// 106th line: second number to match
		// 107th line: target value
		// 108th line: first number to match
		// 109th line: second number to match
		// 110th line: target value
		// 111th line: first number to match
		// 112th line: second number to match
		// 113th line: target value
		// 114th line: first number to match
		// 115th line: second number to match
		// 116th line: target value
		// 117th line: first number to match
		// 118th line: second number to match
		// 119th line: target value
		// 120th line: first number to match
		// 121st line: second number to match
		// 122nd line: target value
		// 123rd line: first number to match
		// 124th line: second number to match
		// 125th line: target value
		// 126th line: first number to match
		// 127th line: second number to match
		// 128th line: target value
		// 129th line: first number to match
		// 130th line: second number to match
		// 131st line: target value
		// 132nd line: first number to match
		// 133rd line: second number to match
		// 134th line: target value
		// 135th line: first number to match
		// 136th line: second number to match
		// 137
