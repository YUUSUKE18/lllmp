import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty() || !isInteger(part)) {
                    continue;
                }
                try {
                    int num = Integer.parseInt(part);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        long count = distinctNumbers.size();
        long sum = 0L;
        for (int num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
    
    private static boolean isInteger(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
