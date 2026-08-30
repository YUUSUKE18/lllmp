import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                int number = Integer.parseInt(token.trim());
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        int count = uniqueNumbers.size();
        long sum = 0L;
        
        for (int number : uniqueNumbers) {
            sum += number;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
