import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.hasNextLine() ? sc.nextLine() : "";
        if (input.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        List<Integer> numbers = new ArrayList<>();
        for (String part : input.split(",")) {
            String trimmed = part.trim();
            try {
                int num = Integer.parseInt(trimmed);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        Set<Integer> uniqueNumbers = new HashSet<>(numbers);
        int count = uniqueNumbers.size();
        long sum = 0;
        for (Integer num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
