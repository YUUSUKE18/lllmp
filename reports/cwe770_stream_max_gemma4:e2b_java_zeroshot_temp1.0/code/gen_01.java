import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean hasValidNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視し、整数として解釈可能かチェック
            if (token.trim().isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(token.trim());
                
                // 64bit整数の範囲内であるという前提で処理を進める
                if (value >= Long.MIN_VALUE && value <= Long.MAX_VALUE) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    hasValidNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 全ての要素が有効な整数であった場合のみ結果を出力する必要があるが、
        // 仕様は「要素数と最大値」を求め、出力することなので、パースできたものに基づいて出力する。
        // ただし、入力されたカンマ区切りの要素が全て数であるという保証はないため、
        // 実際に入力された数値のみをカウントし、最大値を求める。

        if (hasValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 有効な整数が一つもなかった場合、0個と最小値（または適切なデフォルト）を出力する
            // 仕様上は「要素数」と「最大値」を求めるため、入力されたものから導出される。
            // 全ての要素が無視された場合は count=0, max=? となるが、ここでは無視された要素を考慮せず、
            // 実際にパースできた要素のみで計算する。
            // もし有効な数値が一つもなかった場合、countは0となり、maxValueは初期値（Long.MIN_VALUE）のままになるか、
            // それでも count=0 max= (意味のない値) となるため、ここではカウントされた数に基づいて出力する。
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
        }

        scanner.close();
    }
}
