import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            try {
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 無効な行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組 (i, j) について、i != j かつ numbers[i] + numbers[j] == target となるものを探す
        // O(N^2) の方法で全てのペアをチェックする。Nが非常に大きい場合は、より効率的な方法が必要になるが、
        // 制約が不明なため、まずは一般的なO(N^2)で実装する。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
