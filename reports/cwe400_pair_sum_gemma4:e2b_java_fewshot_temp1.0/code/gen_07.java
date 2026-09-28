import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        // 2行目以降を読み込み、数値を格納
        long[] numbers = new long[0];
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    numbers = new long[numbers.length + 1];
                    // 複数の数値が1行に並ぶ可能性があるため、スペースで分割してすべて読み込む
                    String[] parts = trimmedLine.split("\\s+");
                    for (String part : parts) {
                        if (!part.isEmpty()) {
                            numbers[numbers.length] = Long.parseLong(part);
                        }
                    }
                } catch (NumberFormatException e) {
                    // 数値として解釈できない行は無視
                }
            }
        }

        // 読み込んだ数値のみを対象とする
        if (numbers.length == 0) {
            System.out.println("pairs=0");
            return;
        }

        long count = 0;
        int n = numbers.length;

        // 2つの組 (i, j) を探す: i != j かつ numbers[i] + numbers[j] = target
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers[i] + numbers[j] == target) {
                    count++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
