import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数のセットを保持する (Set は重複を自動除去し、ソート順を保つわけではないが、総和は順序无关)
        java.util.Set<Integer> distinctIntegers = new java.util.HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next(); // 空白区切り文字で分割して取得
            
            try {
                int num = Integer.parseInt(token);
                distinctIntegers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
                continue;
            }
        }
        
        long count = distinctIntegers.size();
        BigInteger sum = new BigInteger("0");
        
        for (Integer num : distinctIntegers) {
            sum = sum.add(BigInteger.valueOf(num));
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
