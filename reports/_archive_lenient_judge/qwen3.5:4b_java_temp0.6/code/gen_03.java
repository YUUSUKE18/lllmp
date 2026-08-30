import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        // 空白を削除し、文字列分割して整数として解析
        try {
            BigInteger sum = BigInteger.ZERO;
            java.util.HashSet<Integer> distinctSet = new java.util.HashSet<>();

            for (String token : line.split("\\s+")) {
                if (!token.trim().isEmpty()) {
                    int numberVal;
                    // 整数として解釈可能な場合のみ処理
                    try {
                        String trimmedToken = token.trim();
                        long numLong = Long.parseLong(trimmedToken);
                        distinctSet.add(numLong);
                        sum = sum.add(BigInteger.valueOf(numLong));
                    } catch (NumberFormatException e) {
                        // 整数ではない要素は無視する
                    }
                }
            }

            int count = distinctSet.size();
            System.out.println("count=" + count + " sum=" + sum.toString());
        } catch (Exception e) {
            return;
        } finally {
            scanner.close();
        }
    }
}
