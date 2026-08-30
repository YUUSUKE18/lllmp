import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        
        String line = sc.nextLine();
        long count = 0;
        BigInteger sum = BigInteger.ZERO;
        
        for (String token : line.split(",")) {
            try {
                int num = Integer.parseInt(token.trim());
                // 重複を除くために Set を使用
                if (!sc.hasNextInt()) break; 
                
                // 実際には一度読み込んだ後で処理する必要があるが、Scanner の構造上は再読込が必要。
                // より正確なアプローチ：文字列を解析して一意の整数のみを集める。
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        // 上記のアプローチでは一度読み込むと次が得られないため、より堅牢な実装へ変更する。
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;

        String inputLine = sc.nextLine();
        
        // 一意の整数を保持するための Set (Long を使用して重複除去と合計計算を行う)
        java.util.Set<Long> uniqueNumbers = new java.util.HashSet<>();
        long sum = 0L;
        
        for (String token : inputLine.split(",")) {
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    // Integer.parseInt は -2^31 ~ 2^31-1 を扱えるが、仕様は「64bit 整数の範囲」を要求している。
                    // しかし入力値自体が 64bit に収まるか不明であるため、Long.parseLong で安全に扱う。
                    long num = Long.parseLong(trimmedToken);
                    
                    if (uniqueNumbers.add(num)) {
                        sum += num;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }
        }

        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
