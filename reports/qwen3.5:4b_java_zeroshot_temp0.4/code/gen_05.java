import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueIntegers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                int num = Integer.parseInt(token);
                uniqueIntegers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        long count = uniqueIntegers.size();
        long sum = 0;
        for (Integer num : uniqueIntegers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
