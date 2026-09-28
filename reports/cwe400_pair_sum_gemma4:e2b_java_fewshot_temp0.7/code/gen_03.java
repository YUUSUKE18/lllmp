import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        long target = 0;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // 最初の行が数値でない場合は、処理を終了するか、エラーとして扱うが、
            // 仕様に基づき、続く行を読み続ける必要があるため、ここではエラーとして扱う。
            // ただし、問題の構造から、targetLineは必ず目標値であると仮定する。
            return;
        }

        List<Long> numbers = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            try {
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組 (i, j) で numbers[i] + numbers[j] == target となるものを数える
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
