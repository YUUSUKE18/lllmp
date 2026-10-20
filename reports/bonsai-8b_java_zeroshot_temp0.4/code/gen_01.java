import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        String input = scanner.nextLine();
        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty() && Integer.isInteger(part)) {
                uniqueNumbers.add(Integer.parseInt(part));
            }
        }
        int count = uniqueNumbers.size();
        int sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
