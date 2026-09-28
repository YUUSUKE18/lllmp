import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を保持する (HashSet は重複自動除去機能を持つ)
        BigInteger sum = BigInteger.ZERO;
        int count = 0;

        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                // 文字列を BigInteger に変換し、整数として解釈できるかチェック
                BigInteger value = new BigInteger(token);
                
                // 集合に追加（重複は自動で除外されるため）
                if (!sum.equals(BigInteger.ZERO)) {
                    sum.add(value);
                } else {
                     count++; 
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
