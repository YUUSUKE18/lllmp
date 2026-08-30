import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        long sum = 0;
        int count = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            try {
                long num = Long.parseLong(line.trim());
                sum += num;
                count++;
            } catch (NumberFormatException e) {
                // 無効な行は無視
            }
        }
        
        // 2個の組の個数を求める。
        // 2個の組の個数は、合計のペアの数から、同じ値が重複して数えられている分を引く必要がある。
        // これは、各値が何回出現するかを数えることで計算できる。
        
        // 実際には、各値 x が出現回数 count[x] の場合、その値でできるペアの数は count[x] * (count[x] - 1) / 2 である。
        // 全ての値についてこれを合計する。
        
        // 1. 各数値の出現回数を数える
        java.util.Map<Long, Integer> frequencyMap = new java.util.HashMap<>();
        for (String l : java.util.Arrays.asList(line.split("\\s+"))) {
            if (!l.trim().isEmpty()) {
                try {
                    long num = Long.parseLong(l);
                    frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
                } catch (NumberFormatException e) {
                    // 無視
                }
            }
        }
        
        long totalPairs = 0;
        for (int freq : frequencyMap.values()) {
            if (freq >= 2) {
                // n個の要素から2つ選ぶ組み合わせ: n * (n - 1) / 2
                totalPairs += (long) freq * (freq - 1) / 2;
            }
        }
        
        System.out.println("pairs=" + totalPairs);
    }
}
