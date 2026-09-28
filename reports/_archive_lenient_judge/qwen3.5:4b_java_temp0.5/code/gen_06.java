import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        // カンマ区切りで分割し、空白を除去して整数として解析
        for (String part : line.split(",")) {
            part = part.trim();
            if (!part.isEmpty()) {
                try {
                    long num = Long.parseLong(part);
                    sum = sum.add(BigInteger.valueOf(num));
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
