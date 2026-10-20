import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String input = scanner.nextLine();

        // 数値を抽出し、無視/解析
        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 解釈できない要素を無視
            }
        }

        // 異一性を確保したリストを作成
        Set<Integer> uniqueNumbers = new HashSet<>(numbers);

        // 個数と合計を計算
        int count = uniqueNumbers.size();
        int sum = uniqueNumbers.stream().mapToInt(Integer::intValue).sum();

        // 指定された形式に出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
