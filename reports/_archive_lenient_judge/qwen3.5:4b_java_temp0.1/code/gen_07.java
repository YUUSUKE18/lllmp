import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                long value = Long.parseLong(token);
                
                // 重複チェックとカウント・合計の更新
                if (!sum.equals(BigInteger.valueOf(value))) {
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } else {
                    BigInteger currentSum = new BigInteger(String.valueOf(sum.toString())); 
                    // 上記は冗長な計算を避けるため、単純に値を加算するロジックにする必要があるが、
                    // Java の BigInteger は直接加算可能なので再考。
                    
                    // 修正: 重複チェックと合計の更新を簡素化
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + BigInteger.valueOf(sum.longValue()));
    }
}
