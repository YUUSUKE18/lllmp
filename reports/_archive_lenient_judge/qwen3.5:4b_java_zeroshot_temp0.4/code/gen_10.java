import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        Set<Integer> distinctNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            try {
                int num = Integer.parseInt(token.trim());
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        long count = distinctNumbers.size();
        long sum = 0;
        for (int num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
