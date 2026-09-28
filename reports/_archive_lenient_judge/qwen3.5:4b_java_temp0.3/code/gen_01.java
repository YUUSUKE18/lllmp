import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する変数を用意
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                long value = Long.parseLong(token); // 64bit integer の範囲内と仮定
                
                if (!sum.equals(BigInteger.valueOf(value))) {
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } else {
                    continue; 
                }
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
