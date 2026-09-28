import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null) return;
        
        int target;
        try {
            target = Integer.parseInt(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        Set<Integer> numbers = new HashSet<>();
        int pairsCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) break;

            try {
                int val = Integer.parseInt(line.trim());
                // 足し算可能なペアの検索（2 回繰り返す必要のある部分）
                for (int i = numbers.size() - 1; i >= 0; i--) {
                    if (numbers.contains(val)) {
                        pairsCount++;
                        break;
                    }
                }

                // ターゲット値の差をセットに追加
                int targetVal = target - val;
                if (val != targetVal) {
                    numbers.add(targetVal);
                }
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("pairs=" + pairsCount);
    }
}
