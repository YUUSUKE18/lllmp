import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String line;
        while ((line = scanner.nextLine()) != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                try {
                    int num = Integer.parseInt(part);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        }
        Scanner uniqueScanner = new Scanner(numbers.stream().mapToInt(Integer::intValue).collect(Collectors.toList()));
        Set<Integer> uniqueNumbers = new HashSet<>();
        int count = 0;
        long sum = 0;
        for (int num : uniqueNumbers) {
            count++;
            sum += num;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
