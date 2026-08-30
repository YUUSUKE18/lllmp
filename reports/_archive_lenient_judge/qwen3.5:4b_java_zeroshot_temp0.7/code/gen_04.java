import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数のセットを作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        long count = 0L;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                int value = Integer.parseInt(token);
                
                // セットに追加（重複は自動的に除外される）
                BooleanSet.add(value);
                sum = BigInteger.valueOf(sum.longValue() + value);
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }

    private static final java.util.Set<Integer> BooleanSet = new java.util.HashSet<>();
}
