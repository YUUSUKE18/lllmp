import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();
        String nextLine;

        // 2行目以降の読み込み
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(trimmedLine));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        if (numbers.size() < 2) {
            System.out.println("pairs=0");
            return;
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2)だが、制約によっては許容されると仮定)
        // 課題の性質上、Nが非常に大きい場合、より効率的な方法（ソートと二分探索など）が必要になるが、
        // ここでは最も直接的な解法としてN^2で試みる。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                
                // 2つの組の和が目標値になるかチェック
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
