import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割してトークンを処理
        String[] tokens = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視し、整数として解釈可能かチェック
            if (!token.trim().isEmpty()) {
                try {
                    // 整数に変換
                    long value = Long.parseLong(token.trim());
                    
                    // 要素数と最大値を更新
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                    continue;
                }
            }
        }

        // すべての要素が数値であった場合のみ結果を出力する（仕様上、空要素や不正な要素は無視されるため、countとmaxValueはそれらの有効な要素に基づいている）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
