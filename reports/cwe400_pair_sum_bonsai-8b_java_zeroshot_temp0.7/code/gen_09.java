import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String line;

        while ((line = scanner.nextLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                line = line.trim();
                int value = Integer.parseInt(line);
                numbers.add(value);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        List<List<Integer>> pairs = new ArrayList<>();
        int target = numbers.get(0);
        numbers.remove(0);

        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    List<Integer> pair = Arrays.asList(numbers.get(i), numbers.get(j));
                    pairs.add(pair);
                }
            }
        }

        System.out.println("pairs=" + pairs.size());
    }
}
