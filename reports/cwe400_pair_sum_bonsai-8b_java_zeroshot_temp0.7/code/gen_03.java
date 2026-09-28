import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String targetLine = scanner.nextLine();
        if (targetLine != null && !targetLine.trim().isEmpty()) {
            try {
                long target = Long.parseLong(targetLine);
                numbers.addAll(Arrays.asList scanner.nextInt(), scanner.nextInt(), scanner.nextInt(), scanner.nextInt()));
            } catch (NumberFormatException e) {
                // 空行または非整数入力が与えられた場合、無視
            }
        }

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
