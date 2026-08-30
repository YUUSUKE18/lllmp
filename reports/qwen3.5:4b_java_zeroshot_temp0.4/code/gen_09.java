import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        String line = scanner.nextLine();
        Set<Long> distinctNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            token = token.trim();
            if (token.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(token);
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        long count = distinctNumbers.size();
        long sum = distinctNumbers.stream().mapToLong(Long::longValue).sum();
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
