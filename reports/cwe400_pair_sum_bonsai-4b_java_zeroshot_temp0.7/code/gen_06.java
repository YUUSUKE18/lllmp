import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        
        List<Integer> numbers = new ArrayList<>();
        int count = 0;
        
        while (true) {
            String line = scanner.nextLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }
            try {
                int num = Long.parseLong(line.trim());
                numbers.add(num);
                if (numbers.size() == 2) {
                    count++;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
