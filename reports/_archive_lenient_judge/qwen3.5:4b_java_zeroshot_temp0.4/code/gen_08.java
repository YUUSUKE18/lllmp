import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Long> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                try {
                    long num = Long.parseLong(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            } else {
                continue;
            }
        }

        int count = distinctNumbers.size();
        long sum = 0L;
        
        for (long num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
