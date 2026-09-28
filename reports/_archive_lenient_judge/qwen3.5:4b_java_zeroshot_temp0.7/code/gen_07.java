import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        
        String line = sc.nextLine();
        Set<Integer> distinctIntegers = new HashSet<>();
        
        for (String token : line.split(",")) {
            try {
                int num = Integer.parseInt(token.trim());
                // 整数として解釈できない要素はスキップするため、try-catch を使用
                if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                    distinctIntegers.add(num);
                }
            } catch (NumberFormatException e) {
                // 変換不可能な要素は無視
            }
        }
        
        long count = distinctIntegers.size();
        BigInteger sum = BigInteger.ZERO;
        
        for (int num : distinctIntegers) {
            sum = sum.add(BigInteger.valueOf(num));
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
