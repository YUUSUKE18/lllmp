import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String line;

        while ((line = scanner.nextLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                // 忽略
            }
        }

        int target = numbers.get(0);
        numbers.remove(0);

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
