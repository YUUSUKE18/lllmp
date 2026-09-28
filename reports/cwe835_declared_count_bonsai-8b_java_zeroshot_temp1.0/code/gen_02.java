import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int countInput = 0;
        try {
            countInput = Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            // マッチしない場合、無視
        }

        List<Integer> numbers = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                // 非整数行は無視
            }
        }

        int actualCount = numbers.size();
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
