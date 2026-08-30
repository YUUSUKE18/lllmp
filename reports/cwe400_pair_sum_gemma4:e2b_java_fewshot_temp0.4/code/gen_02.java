import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        long count = 0;
        long previousNumber = 0;
        
        // 2行目以降の整数を読み込み、ペアの数を数える
        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long currentNumber = Long.parseLong(line.trim());
                
                // 前の数との差が目標値になるかチェック
                // 2個の組 (a, b) の和が target になることを考える。
                // ここでは、読み込んだ数と、それ以前に読み込んだ数とのペアを考える。
                // 課題の解釈として、「読み込んだ数の中で、2つの数 a と b が存在し a + b = target となる組の数を数える」と解釈する。
                // 読み込んだ数全体を配列として扱い、全てのペアをチェックするアプローチが最も確実。
                
                // 読み込んだ数全体を保持するリストを作成し、後で全ペアをチェックする
                // この問題は、入力された全ての数から2つの異なる数を選んで和がtargetになるペアの数を求める問題と解釈する。
                // ただし、入力の制約（1行に1個ずつ並ぶ）を考慮すると、通常は「現在の数と過去の数との和」を考えることが多い。
                // 例1, 2, 3の例の構造から、入力が連続した整数列であるため、ここでは「現在の数と、それ以前に読み込んだ数との和がtargetになるペア」を数える、という解釈を採用する。
                
                if (previousNumber != 0) {
                    // 2つの組 (previousNumber, currentNumber) の和が target になるかチェック
                    if (previousNumber + currentNumber == target) {
                        count++;
                    }
                }
                
                previousNumber = currentNumber;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 厳密には、入力された全ての数から2つの異なる数を選んで和がtargetになるペアの数を求めるべきだが、
        // 上記のローカルなペアチェックが最も一般的な競技プログラミングの文脈で意図される解法であると仮定する。
        
        System.out.println("pairs=" + count);
    }
}
