import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String line;

        while ((line = scanner.nextLine()).trim() != null) {
            if (line.isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        long target = numbers.stream().mapToInt(Integer::intValue).sum();
        List<List<Integer>> pairs = new ArrayList<>();

        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    List<Integer> pair = new ArrayList<>();
                    pair.add(numbers.get(i));
                    pair.add(numbers.get(j));
                    pairs.add(pair);
                }
            }
        }

        System.out.println("pairs=" + pairs.size());
    }
}
