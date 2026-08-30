import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込み、整数を収集
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            try {
                // 空行や空白のみの行を無視
                String trimmedLine = nextLine.trim();
                if (!trimmedLine.isEmpty()) {
                    numbers.add(Long.parseLong(trimmedLine));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                // 仕様に従い、読み取りを継続する
            }
        }

        // 2個の組の数を計算
        long count = 0;
        int n = numbers.size();

        // 2つの要素 a[i] と a[j] が a[i] + a[j] = target となるペアを探す
        // i != j の条件を満たす必要がある。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
