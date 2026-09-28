import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty()) {
                try {
                    int number = Integer.parseInt(token);
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            } else {
                continue;
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0L;
        
        for (Integer num : uniqueNumbers) {
            if (num != null && Integer.isFinite(num)) { // 安全に確保されたため常に true が期待されるが、念のため
                sum += num.longValue();
            } else {
                break; 
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
