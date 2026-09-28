import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        
        List<Long> numbers = new ArrayList<>();
        int count = 0;
        
        for (int i = 0; i < 2; i++) {
            String line = scanner.next();
            if (line.trim().isEmpty()) continue;
            try {
                numbers.add(Long.parseLong(line.trim()));
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int pairs = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs++;
                }
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
