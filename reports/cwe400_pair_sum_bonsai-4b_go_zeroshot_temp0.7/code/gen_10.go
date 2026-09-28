package main

import "fmt"

func main() {
    goal := 0
    pairs := 0

    lines := os.NewPipe()
    _, err :=bufio.NewScanner(os.Stdin).ReadFromPipe(lines)
    if err != nil {
        return
    }

    for i := 0; i < len(lines); i++ {
        line := lines[i].String()
        if line == "" {
            continue
        }
        if line == "0" {
            continue
        }
        if line == "1" {
            continue
        }
        if line == "2" {
            continue
        }
        if line == "3" {
            continue
        }
        if line == "4" {
            continue
        }
        if line == "5" {
            continue
        }
        if line == "6" {
            continue
        }
        if line == "7" {
            continue
        }
        if line == "8" {
            continue
        }
        if line == "9" {
            continue
        }
        if line == "10" {
            continue
        }
        if line == "11" {
            continue
        }
        if line == "12" {
            continue
        }
        if line == "13" {
            continue
        }
        if line == "14" {
            continue
        }
        if line == "15" {
            continue
        }
        if line == "16" {
            continue
        }
        if line == "17" {
            continue
        }
        if line == "18" {
            continue
        }
        if line == "19" {
            continue
        }
        if line == "20" {
            continue
        }
        if line == "21" {
            continue
        }
        if line == "22" {
            continue
        }
        if line == "23" {
            continue
        }
        if line == "24" {
            continue
        }
        if line == "25" {
            continue
        }
        if line == "26" {
            continue
        }
        if line == "27" {
            continue
        }
        if line == "28" {
            continue
        }
        if line == "29" {
            continue
        }
        if line == "30" {
            continue
        }
        if line == "31" {
            continue
        }
        if line == "32" {
            continue
        }
        if line == "33" {
            continue
        }
        if line == "34" {
            continue
        }
        if line == "35" {
            continue
        }
        if line == "36" {
            continue
        }
        if line == "37" {
            continue
        }
        if line == "38" {
            continue
        }
        if line == "39" {
            continue
        }
        if line == "40" {
            continue
        }
        if line == "41" {
            continue
        }
        if line == "42" {
            continue
        }
        if line == "43" {
            continue
        }
        if line == "44" {
            continue
        }
        if line == "45" {
            continue
        }
        if line == "46" {
            continue
        }
        if line == "47" {
            continue
        }
        if line == "48" {
            continue
        }
        if line == "49" {
            continue
        }
        if line == "50" {
            continue
        }
        if line == "51" {
            continue
        }
        if line == "52" {
            continue
        }
        if line == "53" {
            continue
        }
        if line == "54" {
            continue
        }
        if line == "55" {
            continue
        }
        if line == "56" {
            continue
        }
        if line == "57" {
            continue
        }
        if line == "58" {
            continue
        }
        if line == "59" {
            continue
        }
        if line == "60" {
            continue
        }
        if line == "61" {
            continue
        }
        if line == "62" {
            continue
        }
        if line == "63" {
            continue
        }
    }

    // 真の目標値を読み取る
    if lines[0].String() != "0" {
        goal := 0
        for i := 0; i < len(lines); i++ {
            if lines[i].String() != "0" {
                goal = int(lines[i].String())
                break
            }
        }
    }

    for i := 0; i < len(lines); i++ {
        line := lines[i].String()
        if line == "" {
            continue
        }
        if line == "0" {
            continue
        }
        if line == "1" {
            continue
        }
        if line == "2" {
            pairs += 1
        }
    }

    fmt.Println("pairs=0")
}
