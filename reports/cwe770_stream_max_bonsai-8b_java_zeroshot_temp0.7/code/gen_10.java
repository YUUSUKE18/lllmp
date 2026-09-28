import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String input = scanner.nextLine();
        
        if (input == null) {
            System.out.println("count=0 max=-2147483648");
            return;
        }
        
        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                if (num > -2147483648 && num < 2147483648) {
                    numbers.add(num);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int count = numbers.size();
        int max = -2147483648;
        if (count > 0) {
            max = numbers.get(count - 1);
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
