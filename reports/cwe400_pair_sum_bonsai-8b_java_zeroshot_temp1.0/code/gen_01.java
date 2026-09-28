import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                try {
                    int val = Integer.parseInt(line);
                    numbers.add(val);
                } catch (NumberFormatException e) {
                    // Ignore non-integer lines
                }
            }
        }

        int target = numbers.get(0);
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
