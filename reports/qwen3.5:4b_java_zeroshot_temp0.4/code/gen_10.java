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
        Set<Integer> distinctNumbers = new HashSet<>();
        
        // 空白とカンマで分割し、整数として解析可能かチェック
        String[] parts = line.split("[,\\s]+");
        for (String part : parts) {
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part.trim());
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
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
