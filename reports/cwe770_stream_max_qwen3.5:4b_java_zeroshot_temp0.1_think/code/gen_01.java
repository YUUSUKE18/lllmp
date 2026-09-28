import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // カンマと空白（改行含む）を区切り文字として設定
        sc.useDelimiter("[\\s,]+");
        
        long count = 0;
        long max = Long.MIN_VALUE;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                // 空白が含まれている場合も trim で処理（Scanner のデフォルトでは区切り文字は消費されるが、安全のため）
                long val = Long.parseLong(token.trim());
                count++;
                if (val > max) {
                    max = val;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        // 有効な要素がない場合の処理（仕様上、値が存在しない場合は最大値は定義されないが、出力形式を維持するため 0 とする）
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
