import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        
        // 第1行：目標値を入力
        String targetLine = scanner.nextLine();
        if (targetLine != null && !targetLine.trim().isEmpty()) {
            try {
                int target = Integer.parseInt(targetLine);
                numbers.add(target);
            } catch (NumberFormatException e) {
                // 質値が無効な行を無視
            }
        }
        
        // 前後の空行を無視し、2行目以降の整数を読み込む
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty() && !line.matches("^\\s*")) {
                try {
                    int num = Integer.parseInt(line);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 質値が無効な行を無視
                }
            }
        }
        
        // 目標値と数値の差分を計算して、対象の組（2つの数）を検索
        int target = numbers.get(0);
        int count = 0;
        for (int i = 1; i < numbers.size(); i++) {
            if (numbers.get(i) - target == 0) {
                count++;
            }
        }
        
        // 最大の2つの数を取得
        int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE;
        for (int num : numbers) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
        }
        
        // 最大の2つの数を相加して目標値に達するか確認
        if (max1 + max2 == target) {
            count++;
        }
        
        // 最大の2つの数が存在し、相加して目標値に達している場合
        if (count >= 2 && max1 != Integer.MIN_VALUE && max2 != Integer.MIN_VALUE) {
            System.out.println("pairs=" + count);
        }
    }
}
