import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Set<Integer> distinctNumbers = new HashSet<>();
            
            for (String token : line.split(",")) {
                token = token.trim();
                try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
            
            long count = distinctNumbers.size();
            long sum = distinctNumbers.stream().mapToInt(Integer::intValue).sum();
            
            System.out.println("count=" + count + " sum=" + sum);
        }
    }
}
