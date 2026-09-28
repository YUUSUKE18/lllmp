import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        if (scanner.hasNext()) {
            while (scanner.hasNext()) {
                String token = scanner.next();
                
                try {
                    long value = Long.parseLong(token); // 64bit integer の範囲内と仮定
                    
                    sum.add(BigInteger.valueOf(value));
                    
                    // セットに存在しない要素のみカウントする（重複を除く）
                    if (count == 0 || !seen.contains((int)value)) { 
                        seen.add((int)value);
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }

    private static java.util.Set<Integer> seen = new java.util.HashSet<>();
}
