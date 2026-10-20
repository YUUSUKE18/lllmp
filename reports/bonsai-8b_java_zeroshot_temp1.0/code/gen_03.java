import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Set<Integer> uniqueNumbers = new HashSet<>();
        String input = args[0];
        String[] parts = input.trim().split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int count = uniqueNumbers.size();
        long sum = uniqueNumbers.stream().mapToLong(Integer::intValue).sum();
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
