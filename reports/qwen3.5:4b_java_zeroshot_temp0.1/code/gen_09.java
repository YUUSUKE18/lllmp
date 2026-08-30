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
        
        try {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                try {
                    int num = Integer.parseInt(part);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        } catch (Exception e) {
            // エラー発生時は空集合とする
        }
        
        int count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
