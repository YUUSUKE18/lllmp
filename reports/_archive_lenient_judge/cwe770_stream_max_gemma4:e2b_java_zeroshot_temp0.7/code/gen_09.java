import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();

        // カンマで区切られた文字列をトークンに分割
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視して整数として解釈できるか試みる
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedToken);
                // 64bit整数の範囲内であることは前提（Long型で扱っているため）
                
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力する（仕様上、入力が空の場合の挙動は明記されていないが、数値が存在しない場合はcount=0, max=???となるため、全ての数値処理後に結果を出す）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else if (line.trim().isEmpty()) {
            // 入力が完全に空文字列だった場合（要素が0個の場合）
            System.out.println("count=0 max=-9223372036854775808"); // Long.MIN_VALUEを最大値として扱うか、あるいは仕様に厳密に従う。ここでは数値が存在しないため、一般的な解釈として0個の要素と最小値を設定するか、あるいは単に出力を省略するが、出力形式を維持するためには何かを設定する必要がある。
            // 以下の処理では、もし数字が一つもなかった場合、count=0, maxValue=Long.MIN_VALUEとなる。これをそのまま出力する。
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        } else {
            // 入力があったが数値が一つもなかった場合（例: ",," や " " のみ）
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        scanner.close();
    }
}
