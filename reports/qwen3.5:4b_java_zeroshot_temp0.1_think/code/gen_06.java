import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Set<Long> uniqueNumbers = new HashSet<>();
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                try {
                    long val = Long.parseLong(part);
                    uniqueNumbers.add(val);
                } catch (NumberFormatException e) {
                }
            }
        }
        
        long count = uniqueNumbers.size();
        long sum = 0;
        for (long num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
