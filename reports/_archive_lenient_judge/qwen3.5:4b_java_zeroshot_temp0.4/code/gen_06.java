import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                int value = Integer.parseInt(token.trim());
                
                if (!sum.equals(sum.add(BigInteger.valueOf(value)))) {
                    // 既に加算済みではない場合のみ加算（重複除外）
                    sum = sum.add(BigInteger.valueOf(value));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        System.out.println("count=" + scanner.count() + " sum=" + sum);
    }

    private static int count = 0;
}
