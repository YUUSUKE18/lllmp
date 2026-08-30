import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) {
                try {
                    int num = Integer.parseInt(token.trim());
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            } else if (!token.isEmpty()) {
                 continue; 
            }
        }

        long count = distinctNumbers.size();
        long sum = 0L;
        
        for (int num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
