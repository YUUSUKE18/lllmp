import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String input = scanner.nextLine();

        // 元の列を処理
        String[] elements = input.trim().split(",");
        for (String element : elements) {
            element = element.trim();
            if (element.isEmpty()) continue;
            try {
                int num = Integer.parseInt(element);
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 重複を除いた整数とその個数、合計を計算
        Set<Integer> uniqueNumbers = new HashSet<>(numbers);
        int count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        // 出力
        System.out.printf("count=%d sum=%d%n", count, sum);
    }
}
