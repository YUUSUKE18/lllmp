import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        String line = scanner.nextLine();
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            token = token.trim();
            if (token.isEmpty()) {
                continue;
            }
            
            try {
                int num = Integer.parseInt(token);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        long count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
