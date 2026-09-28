import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        
        List<Long> numbers = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line.trim());
                if (num >= 0 && num <= Long.MAX_VALUE) {
                    numbers.add(num);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int count = 0;
        Set<String> pairs = new HashSet<>();
        
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    String pairStr = String.valueOf(numbers.get(i)) + "," + String.valueOf(numbers.get(j));
                    pairs.add(pairStr);
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
