import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は終了
            System.out.println("count=0 max=0");
            return;
        }
        
        String line = scanner.nextLine();
        
        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();
            
            // 空文字列でないことを確認
            if (trimmedToken.isEmpty()) {
                continue;
            }
            
            try {
                // long型としてパースを試みる
                long value = Long.parseLong(trimmedToken);
                
                // 有効な整数としてカウントと最大値を更新
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

        // 処理された要素が一つもなかった場合（または全ての要素が無効だった場合）の初期値処理
        if (!foundNumber) {
            // 要素が一つもなかった場合は、count=0, max=0 または定義された初期値を出力する。
            // 仕様上、要素が0個の場合、最大値は定義が難しいが、ここでは0とする。
            System.out.println("count=0 max=0");
        } else {
            // 結果を出力
            System.out.println("count=" + count + " max=" + maxValue);
        }
        
        scanner.close();
    }
}
