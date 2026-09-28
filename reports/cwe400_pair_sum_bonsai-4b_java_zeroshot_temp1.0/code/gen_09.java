import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        
        List<Integer> numbers = new ArrayList<>();
        while (true) {
            String line = scanner.nextLine();
            if (line.isEmpty()) continue;
            try {
                int num = Long.parseLong(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
            
            if (numbers.size() == 2) {
                int first = numbers.get(0);
                int second = numbers.get(1);
                if (first + second == target) {
                    numbers.remove(0);
                    numbers.remove(1);
                    System.out.println("2");
                } else {
                    break;
                }
            }
        }
        
        if (numbers.size() == 0) {
            System.out.println("0");
        } else {
            System.out.println("0");
        }
    }
}
