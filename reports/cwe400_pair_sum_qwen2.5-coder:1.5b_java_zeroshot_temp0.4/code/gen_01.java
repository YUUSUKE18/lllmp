import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int target = scanner.nextInt();
        scanner.nextLine(); // Skip the empty line

        int count = 0;
        Map<Integer, Integer> countMap = new HashMap<>();

        while (scanner.hasNextInt()) {
            int num = scanner.nextInt();
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        for (int num1 : countMap.keySet()) {
            for (int num2 : countMap.keySet()) {
                if (num1 != num2 && num1 + num2 == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
