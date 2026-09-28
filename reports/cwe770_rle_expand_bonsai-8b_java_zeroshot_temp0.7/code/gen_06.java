import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] parts = input.split(",");
        
        List<Integer> numbers = new ArrayList<>();
        for (String part : parts) {
            if (part.isEmpty()) continue;
            String[] valueAndCount = part.split(":");
            if (valueAndCount.length != 2) continue;
            try {
                int value = Integer.parseInt(valueAndCount[0]);
                int count = Integer.parseInt(valueAndCount[1]);
                if (count > 0) {
                    for (int i = 0; i < count; i++) {
                        numbers.add(value);
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int count = numbers.size();
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
