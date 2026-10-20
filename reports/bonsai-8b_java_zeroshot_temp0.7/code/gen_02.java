import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> input = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                input.add(line);
            }
        }
        scanner.close();
        Map<Integer, Integer> uniqueNumbers = new HashMap<>();
        for (String s : input) {
            try {
                int num = Integer.parseInt(s);
                uniqueNumbers.put(num, uniqueNumbers.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                // Ignore invalid integers
            }
        }
        int count = 0;
        long sum = 0;
        for (int key : uniqueNumbers.keySet()) {
            count++;
            sum += key;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
