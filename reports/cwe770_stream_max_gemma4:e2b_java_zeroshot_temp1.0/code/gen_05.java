import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで区切られた文字列をトークン化する
        String[] tokens = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視して整数として解釈できるか試みる
            try {
                // トークンから前後の空白を除去
                String trimmedToken = token.trim();
                if (trimmedToken.isEmpty()) {
                    continue;
                }
                
                long value = Long.parseLong(trimmedToken);
                
                // 64bit整数の範囲内であることを確認（Long型が許容する範囲）
                // 問題文の仕様上、値は64bit整数に収まるとされているため、Long型で十分処理可能。

                if (!foundNumber) {
                    // 最初の有効な数をカウントと最大値として設定
                    count = value;
                    maxValue = value;
                    foundNumber = true;
                } else {
                    // カウントと最大値を更新
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // すべての数値が見つからなかった場合、countとmaxValueを適切に処理する必要があるが、
        // 仕様上「要素数」と「最大値」を求めるので、もし何も数値がなければデフォルト値をどうするか。
        // ここでは、入力された有効な整数の数と最大値を計算する。
        
        if (!foundNumber) {
            // 有効な整数が一つもなかった場合（空の入力や非数値のみ）、出力する値が定義されない。
            // このケースの具体的な仕様が不明だが、ここでは何も検出されなかったと見なして処理を終了するか、
            // または最大値に特殊な値を設定する必要がある。
            // 念のため、もし入力が空であれば、count=0, max=最小値として出力するなどの判断が必要だが、
            // 「要素数」と「最大値」を求めよという指示に基づき、検出された数のみを基に計算する。
            // もし何も見つからなかった場合は、カウント0、最大値は無意味になるが、ここでは検出された値を出力する。
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
