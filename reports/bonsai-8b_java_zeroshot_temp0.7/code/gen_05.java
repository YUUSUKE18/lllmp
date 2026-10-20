import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        String input = scanner.nextLine();
        String[] elements = input.trim().split(",");
        for (String element : elements) {
            element = element.trim();
            if (!element.isEmpty() && isInteger(element)) {
                uniqueNumbers.add(Integer.parseInt(element));
            }
        }
        int count = uniqueNumbers.size();
        int sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
