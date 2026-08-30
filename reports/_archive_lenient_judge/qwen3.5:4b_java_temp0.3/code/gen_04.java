import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成（BigInteger で扱うため）
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                // 文字列を BigInteger に変換し、有効な数値かチェックする
                if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                    BigInteger num = new BigInteger(token);
                    
                    sum.add(num);
                    count++;
                } else {
                    continue; // 空白や空文字は無視（Scanner.next() は通常空白をスキップするが、安全のため）
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
