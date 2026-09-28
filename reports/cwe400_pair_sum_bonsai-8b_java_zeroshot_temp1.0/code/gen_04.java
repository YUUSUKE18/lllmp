import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;
        
        // 第1行：目標値
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.isEmpty()) {
                try {
                    target = Integer.parseInt(line);
                } catch (NumberFormatException e) {
                    // 値が間違っている場合、無視
                }
            }
        }
        
        // 前後の空白を処理
        int start = 0;
        while (start < scanner.position() && !Character.isWhitespace(scanner.next())) start++;
        int end = scanner.position();
        while (end < scanner.position() && Character.isWhitespace(scanner.next())) end++;
        
        // 第2行以降の整数を読み込む
        while (start < end) {
            String line = scanner.nextLine();
            if (!line.isEmpty() && !line.trim().isEmpty()) {
                try {
                    int num = Integer.parseInt(line);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 値が間違っている場合、無視
                }
            }
        }
        
        // 足すの合計
        int sum = numbers.stream().mapToInt(Integer::intValue).sum();
        int count = 0;
        
        // 所有可能なペアを生成
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }
        
        // 出力
        System.out.println("pairs=" + count);
    }
}
