import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;

        String line = sc.nextLine();
        // 空白を区切り文字として利用して分割し、有効な整数のみフィルタリング
        Set<Integer> distinctNumbers = new HashSet<>();
        
        for (String part : line.split(",")) {
            try {
                int num = Integer.parseInt(part.trim());
                if (!distinctNumbers.add(num)) continue; // 重複がある場合は無視（set の add が false を返す）
                break; 
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素はスキップ
                continue;
            }
        }

        int count = distinctNumbers.size();
        
        if (count == 0) return; // 無効なデータの場合、出力しない（または空行だが仕様より「整数列」と言われているため通常は存在）
        long sum = 0L;
        
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
