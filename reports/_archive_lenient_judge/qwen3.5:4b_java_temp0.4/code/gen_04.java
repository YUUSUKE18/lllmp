import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        Set<Integer> distinctNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            token = token.trim();
            try {
                int num = Integer.parseInt(token);
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        long count = distinctNumbers.size();
        BigInteger sumBig = new BigInteger("0");
        for (int num : distinctNumbers) {
            sumBig = sumBig.add(BigInteger.valueOf(num));
        }
        
        System.out.println("count=" + count + " sum=" + sumBig);
    }
}
