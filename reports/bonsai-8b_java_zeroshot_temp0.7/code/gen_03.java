import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();

        for (String s : input.trim().split(",")) {
            s = s.trim();
            if (s.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(s));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        Set<Integer> uniqueNumbers = new HashSet<>(numbers);
        int count = uniqueNumbers.size();
        long sum = uniqueNumbers.stream().mapToInt(Integer::intValue).sum();

        System.out.println("count=" + count + " sum=" + sum);
    }
}
